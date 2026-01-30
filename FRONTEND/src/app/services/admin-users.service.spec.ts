import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AdminUsersService } from './admin-users.service';
import { DeactivateUserWarnings, DeactivateUserBlocked } from '../models/user.models';
import { API_CONFIG } from '../config/api.config';

describe('AdminUsersService - User Deactivation', () => {
  let service: AdminUsersService;
  let httpMock: HttpTestingController;
  const baseUrl = API_CONFIG.getApiUrl();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdminUsersService]
    });
    service = TestBed.inject(AdminUsersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('deactivateUser', () => {
    const userId = '123e4567-e89b-12d3-a456-426614174000';

    it('should deactivate user successfully with default force=false', (done) => {
      const successResponse = { message: 'User deactivated successfully', userId };

      service.deactivateUser(userId).subscribe({
        next: (response) => {
          expect(response).toEqual(successResponse);
          done();
        }
      });

      const req = httpMock.expectOne(`${baseUrl}/users/${userId}/deactivate`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ force: false });
      req.flush(successResponse);
    });

    it('should send force=true when specified', (done) => {
      const successResponse = { message: 'User deactivated successfully', userId };

      service.deactivateUser(userId, true).subscribe({
        next: (response) => {
          expect(response).toEqual(successResponse);
          done();
        }
      });

      const req = httpMock.expectOne(`${baseUrl}/users/${userId}/deactivate`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ force: true });
      req.flush(successResponse);
    });

    it('should throw error on 409 Conflict (soft warnings)', (done) => {
      const warningsResponse: DeactivateUserWarnings = {
        code: 'DEACTIVATE_USER_WARNINGS',
        pointsBalance: 500,
        completedEventsCount: 3,
        completedRedemptionsCount: 2,
        lastActivityDate: '2026-01-25T10:00:00Z',
        daysSinceLastActivity: 5,
        message: 'Deactivation has warnings. To proceed, resubmit with force=true.'
      };

      service.deactivateUser(userId).subscribe({
        error: (error) => {
          expect(error.status).toBe(409);
          expect(error.error).toEqual(warningsResponse);
          done();
        }
      });

      const req = httpMock.expectOne(`${baseUrl}/users/${userId}/deactivate`);
      req.flush(warningsResponse, { status: 409, statusText: 'Conflict' });
    });

    it('should throw error on 422 Unprocessable Entity (hard block)', (done) => {
      const blockedResponse: DeactivateUserBlocked = {
        code: 'DEACTIVATE_USER_BLOCKED',
        pendingRedemptionsCount: 2,
        approvedRedemptionsCount: 1,
        activeEventRegistrationsCount: 0,
        targetIsAdmin: false,
        selfDeactivation: false,
        reasons: ['User has 2 pending redemptions that must be resolved first.', 'User has 1 approved redemption awaiting fulfillment.'],
        message: 'Cannot deactivate user due to multiple blocking conditions.'
      };

      service.deactivateUser(userId).subscribe({
        error: (error) => {
          expect(error.status).toBe(422);
          expect(error.error).toEqual(blockedResponse);
          done();
        }
      });

      const req = httpMock.expectOne(`${baseUrl}/users/${userId}/deactivate`);
      req.flush(blockedResponse, { status: 422, statusText: 'Unprocessable Entity' });
    });
  });

  describe('isDeactivationWarning', () => {
    it('should return true for 409 error with DEACTIVATE_USER_WARNINGS code', () => {
      const error = {
        status: 409,
        error: { code: 'DEACTIVATE_USER_WARNINGS' }
      };
      expect(service.isDeactivationWarning(error)).toBe(true);
    });

    it('should return false for 409 error with different code', () => {
      const error = {
        status: 409,
        error: { code: 'SOME_OTHER_CODE' }
      };
      expect(service.isDeactivationWarning(error)).toBe(false);
    });

    it('should return false for non-409 status', () => {
      const error = {
        status: 422,
        error: { code: 'DEACTIVATE_USER_WARNINGS' }
      };
      expect(service.isDeactivationWarning(error)).toBe(false);
    });

    it('should return false for null/undefined error', () => {
      expect(service.isDeactivationWarning(null)).toBe(false);
      expect(service.isDeactivationWarning(undefined)).toBe(false);
    });
  });

  describe('isDeactivationBlocked', () => {
    it('should return true for 422 error with DEACTIVATE_USER_BLOCKED code', () => {
      const error = {
        status: 422,
        error: { code: 'DEACTIVATE_USER_BLOCKED' }
      };
      expect(service.isDeactivationBlocked(error)).toBe(true);
    });

    it('should return false for 422 error with different code', () => {
      const error = {
        status: 422,
        error: { code: 'VALIDATION_ERROR' }
      };
      expect(service.isDeactivationBlocked(error)).toBe(false);
    });

    it('should return false for non-422 status', () => {
      const error = {
        status: 400,
        error: { code: 'DEACTIVATE_USER_BLOCKED' }
      };
      expect(service.isDeactivationBlocked(error)).toBe(false);
    });

    it('should return false for null/undefined error', () => {
      expect(service.isDeactivationBlocked(null)).toBe(false);
      expect(service.isDeactivationBlocked(undefined)).toBe(false);
    });
  });
});
