import { Component } from '@angular/core';
import { Subject, forkJoin } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserSidebarComponent } from '../../../components/user-sidebar/user-sidebar.component';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/auth.service";
import * as i2 from "../../../services/user-dashboard.service";
import * as i3 from "@angular/router";
import * as i4 from "@angular/common";
import * as i5 from "@angular/forms";
function UserDashboardComponent_div_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 22);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(1, "svg", 23);
    i0.ɵɵelement(2, "path", 24);
    i0.ɵɵelementEnd();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r0.errorMessage);
} }
function UserDashboardComponent_div_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 25);
    i0.ɵɵelement(1, "div", 26);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Loading dashboard data...");
    i0.ɵɵelementEnd()();
} }
function UserDashboardComponent_div_22_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 27)(1, "div", 28)(2, "div", 29);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(3, "svg", 23);
    i0.ɵɵelement(4, "path", 30);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(5, "div", 31)(6, "h3", 32);
    i0.ɵɵtext(7, "Current Balance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "p", 33);
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "span", 34);
    i0.ɵɵtext(12, "Points");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(13, "div", 35)(14, "div", 36);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(15, "svg", 23);
    i0.ɵɵelement(16, "path", 37);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(17, "div", 31)(18, "h3", 32);
    i0.ɵɵtext(19, "Points Earned");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "p", 33);
    i0.ɵɵtext(21);
    i0.ɵɵpipe(22, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "span", 34);
    i0.ɵɵtext(24, "Points");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(25, "div", 35)(26, "div", 38);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(27, "svg", 23);
    i0.ɵɵelement(28, "path", 39);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(29, "div", 31)(30, "h3", 32);
    i0.ɵɵtext(31, "Points Redeemed");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "p", 33);
    i0.ɵɵtext(33);
    i0.ɵɵpipe(34, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "span", 34);
    i0.ɵɵtext(36, "Points");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(37, "div", 35)(38, "div", 40);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(39, "svg", 23);
    i0.ɵɵelement(40, "path", 41);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(41, "div", 31)(42, "h3", 32);
    i0.ɵɵtext(43, "Events Registered");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(44, "p", 33);
    i0.ɵɵtext(45);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(46, "span", 34);
    i0.ɵɵtext(47, "Events");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(9);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 4, ctx_r0.stats.currentBalance));
    i0.ɵɵadvance(12);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(22, 6, ctx_r0.stats.pointsEarned));
    i0.ɵɵadvance(12);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(34, 8, ctx_r0.stats.pointsRedeemed));
    i0.ɵɵadvance(12);
    i0.ɵɵtextInterpolate(ctx_r0.stats.eventsRegistered);
} }
function UserDashboardComponent_div_23_div_6_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 53)(1, "div", 54)(2, "span", 55);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "span", 56);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "number");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const transaction_r3 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(transaction_r3.description || transaction_r3.type);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r0.getTransactionClass(transaction_r3.points));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", transaction_r3.points >= 0 ? "+" : "", "", i0.ɵɵpipeBind1(6, 4, transaction_r3.points), " Points ");
} }
function UserDashboardComponent_div_23_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 51);
    i0.ɵɵtemplate(1, UserDashboardComponent_div_23_div_6_div_1_Template, 7, 6, "div", 52);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r0.recentTransactions);
} }
function UserDashboardComponent_div_23_ng_template_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 57);
    i0.ɵɵtext(1, "No transactions yet");
    i0.ɵɵelementEnd();
} }
function UserDashboardComponent_div_23_div_17_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 60)(1, "div", 61);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(2, "svg", 23);
    i0.ɵɵelement(3, "path", 62);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(4, "div", 63)(5, "h3", 64);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "span", 65);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 66);
    i0.ɵɵtext(10);
    i0.ɵɵpipe(11, "date");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const event_r4 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(6);
    i0.ɵɵtextInterpolate(event_r4.name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngClass", ctx_r0.getEventStatusBadgeClass(event_r4));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", ctx_r0.getEventStatusText(event_r4), " ");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind2(11, 4, event_r4.eventDate, "MMM d, yyyy"), " ");
} }
function UserDashboardComponent_div_23_div_17_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 58);
    i0.ɵɵtemplate(1, UserDashboardComponent_div_23_div_17_div_1_Template, 12, 7, "div", 59);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r0.upcomingEvents);
} }
function UserDashboardComponent_div_23_ng_template_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p", 57);
    i0.ɵɵtext(1, "No upcoming events");
    i0.ɵɵelementEnd();
} }
function UserDashboardComponent_div_23_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 42)(1, "div", 43)(2, "div", 44)(3, "h2", 45);
    i0.ɵɵtext(4, "Recent Transactions");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(5, "div", 46);
    i0.ɵɵtemplate(6, UserDashboardComponent_div_23_div_6_Template, 2, 1, "div", 47)(7, UserDashboardComponent_div_23_ng_template_7_Template, 2, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 48)(10, "button", 49);
    i0.ɵɵlistener("click", function UserDashboardComponent_div_23_Template_button_click_10_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.viewAllTransactions()); });
    i0.ɵɵtext(11, "View All \u2192");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(12, "div", 43)(13, "div", 44)(14, "h2", 45);
    i0.ɵɵtext(15, "Upcoming Events");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(16, "div", 46);
    i0.ɵɵtemplate(17, UserDashboardComponent_div_23_div_17_Template, 2, 1, "div", 50)(18, UserDashboardComponent_div_23_ng_template_18_Template, 2, 0, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "div", 48)(21, "button", 49);
    i0.ɵɵlistener("click", function UserDashboardComponent_div_23_Template_button_click_21_listener() { i0.ɵɵrestoreView(_r2); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.viewAllEvents()); });
    i0.ɵɵtext(22, "See All \u2192");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const noTransactions_r5 = i0.ɵɵreference(8);
    const noEvents_r6 = i0.ɵɵreference(19);
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(6);
    i0.ɵɵproperty("ngIf", ctx_r0.recentTransactions && ctx_r0.recentTransactions.length > 0)("ngIfElse", noTransactions_r5);
    i0.ɵɵadvance(11);
    i0.ɵɵproperty("ngIf", ctx_r0.upcomingEvents && ctx_r0.upcomingEvents.length > 0)("ngIfElse", noEvents_r6);
} }
function UserDashboardComponent_div_24_div_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 43)(1, "div", 44)(2, "h2", 45);
    i0.ɵɵtext(3, "Redemption Status");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(4, "div", 46)(5, "div", 84)(6, "div", 85)(7, "div", 86);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(8, "svg", 23);
    i0.ɵɵelement(9, "path", 87);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(10, "div", 88)(11, "span", 89);
    i0.ɵɵtext(12, "Pending Approvals");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "span", 90);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "span", 91);
    i0.ɵɵtext(16, "Requests");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(17, "div", 85)(18, "div", 92);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(19, "svg", 23);
    i0.ɵɵelement(20, "path", 93);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(21, "div", 88)(22, "span", 89);
    i0.ɵɵtext(23, "Approved");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(24, "span", 90);
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(26, "span", 91);
    i0.ɵɵtext(27, "Redemptions");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(28, "div", 85)(29, "div", 94);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(30, "svg", 23);
    i0.ɵɵelement(31, "path", 95);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(32, "div", 88)(33, "span", 89);
    i0.ɵɵtext(34, "Delivered");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(35, "span", 90);
    i0.ɵɵtext(36);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "span", 91);
    i0.ɵɵtext(38, "Shipment");
    i0.ɵɵelementEnd()()()()()();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(14);
    i0.ɵɵtextInterpolate(ctx_r0.redemptionCounts.pending);
    i0.ɵɵadvance(11);
    i0.ɵɵtextInterpolate(ctx_r0.redemptionCounts.approved);
    i0.ɵɵadvance(11);
    i0.ɵɵtextInterpolate(ctx_r0.redemptionCounts.delivered);
} }
function UserDashboardComponent_div_24_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 67)(1, "div", 68)(2, "div", 69)(3, "h2", 70);
    i0.ɵɵtext(4, "Top Rewards Available");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 71);
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(6, "svg", 72);
    i0.ɵɵelement(7, "rect", 73)(8, "rect", 74)(9, "rect", 75)(10, "rect", 76)(11, "rect", 77)(12, "rect", 78)(13, "rect", 79)(14, "rect", 80)(15, "rect", 81);
    i0.ɵɵelementEnd()();
    i0.ɵɵnamespaceHTML();
    i0.ɵɵelementStart(16, "button", 82);
    i0.ɵɵlistener("click", function UserDashboardComponent_div_24_Template_button_click_16_listener() { i0.ɵɵrestoreView(_r7); const ctx_r0 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r0.browseRewards()); });
    i0.ɵɵtext(17, " Browse Rewards \u2192 ");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(18, UserDashboardComponent_div_24_div_18_Template, 39, 3, "div", 83);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(18);
    i0.ɵɵproperty("ngIf", ctx_r0.redemptionCounts);
} }
export class UserDashboardComponent {
    constructor(authService, userDashboardService, router, cdr) {
        this.authService = authService;
        this.userDashboardService = userDashboardService;
        this.router = router;
        this.cdr = cdr;
        this.isLoading = true;
        this.errorMessage = null;
        this.Math = Math;
        // Dashboard data
        this.stats = {
            currentBalance: 0,
            pointsEarned: 0,
            pointsRedeemed: 0,
            eventsRegistered: 0
        };
        this.recentTransactions = [];
        this.upcomingEvents = [];
        this.redemptionCounts = {
            pending: 0,
            approved: 0,
            delivered: 0,
            rejected: 0
        };
        this.searchQuery = '';
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        this.authService.currentUser$
            .pipe(takeUntil(this.destroy$))
            .subscribe(user => {
            this.currentUser = user;
            if (user) {
                this.loadDashboardData();
            }
        });
    }
    loadDashboardData() {
        this.isLoading = true;
        this.errorMessage = null;
        console.log('Loading dashboard data...');
        // Load all dashboard data in parallel using forkJoin
        forkJoin({
            stats: this.userDashboardService.getUserStats(),
            transactions: this.userDashboardService.getRecentTransactions(4),
            events: this.userDashboardService.getUpcomingEvents(2),
            redemptionCounts: this.userDashboardService.getRedemptionStatusCounts()
        })
            .pipe(takeUntil(this.destroy$), finalize(() => {
            // Use setTimeout to ensure change detection happens after data is set
            setTimeout(() => {
                this.isLoading = false;
                this.cdr.detectChanges();
            }, 0);
        }))
            .subscribe({
            next: (results) => {
                console.log('Dashboard data loaded:', results);
                this.stats = results.stats;
                this.recentTransactions = results.transactions;
                this.upcomingEvents = results.events;
                this.redemptionCounts = results.redemptionCounts;
                this.cdr.detectChanges();
            },
            error: (error) => {
                console.error('Error loading dashboard data:', error);
                this.errorMessage = 'Failed to load dashboard data. Some information may be unavailable.';
                this.cdr.detectChanges();
            }
        });
    }
    onSearch(query) {
        console.log('Search query:', query);
        // Implement search functionality if needed
    }
    viewAllTransactions() {
        this.router.navigateByUrl('/user/transactions');
    }
    viewAllEvents() {
        this.router.navigateByUrl('/user/events');
    }
    browseRewards() {
        this.router.navigateByUrl('/user/products');
    }
    viewRedemptions() {
        this.router.navigateByUrl('/user/redemptions');
    }
    getTransactionClass(points) {
        return points >= 0 ? 'positive' : 'negative';
    }
    getEventStatusBadgeClass(event) {
        if (event.registrationStatus === 'Registered') {
            return 'registered';
        }
        if (event.spotsLeft && event.spotsLeft <= 5) {
            return 'spots-left';
        }
        return 'available';
    }
    getEventStatusText(event) {
        if (event.registrationStatus === 'Registered') {
            return 'Registered';
        }
        if (event.spotsLeft !== undefined) {
            return `${event.spotsLeft} Spots Left`;
        }
        return 'Available';
    }
    logout() {
        this.authService.logout();
        this.router.navigateByUrl('/login');
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    static { this.ɵfac = function UserDashboardComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || UserDashboardComponent)(i0.ɵɵdirectiveInject(i1.AuthService), i0.ɵɵdirectiveInject(i2.UserDashboardService), i0.ɵɵdirectiveInject(i3.Router), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: UserDashboardComponent, selectors: [["app-user-dashboard"]], decls: 25, vars: 8, consts: [["noTransactions", ""], ["noEvents", ""], [1, "user-dashboard-wrapper"], [1, "user-dashboard-main"], [1, "dashboard-header"], [1, "search-container"], ["viewBox", "0 0 24 24", "fill", "none", "stroke", "currentColor", 1, "search-icon"], ["cx", "11", "cy", "11", "r", "8"], ["d", "m21 21-4.35-4.35"], ["type", "text", "placeholder", "Search...", 1, "search-input", 3, "ngModelChange", "input", "ngModel"], [1, "header-right"], [1, "user-menu"], [1, "user-label"], [1, "user-avatar-small"], [1, "logout-btn", 3, "click"], [1, "dashboard-content"], [1, "page-title"], ["class", "error-alert", 4, "ngIf"], ["class", "loading-indicator", 4, "ngIf"], ["class", "stats-grid", 4, "ngIf"], ["class", "dashboard-grid", 4, "ngIf"], ["class", "dashboard-grid-bottom", 4, "ngIf"], [1, "error-alert"], ["viewBox", "0 0 24 24", "fill", "currentColor"], ["d", "M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"], [1, "loading-indicator"], [1, "spinner"], [1, "stats-grid"], [1, "stat-card", "primary"], [1, "stat-icon", "balance"], ["d", "M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"], [1, "stat-info"], [1, "stat-label"], [1, "stat-value"], [1, "stat-unit"], [1, "stat-card"], [1, "stat-icon", "earned"], ["d", "M7 14l5-5 5 5z"], [1, "stat-icon", "redeemed"], ["d", "M7 10l5 5 5-5z"], [1, "stat-icon", "events"], ["d", "M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"], [1, "dashboard-grid"], [1, "card"], [1, "card-header"], [1, "card-title"], [1, "card-body"], ["class", "transactions-list", 4, "ngIf", "ngIfElse"], [1, "card-footer"], [1, "btn-link", 3, "click"], ["class", "events-list", 4, "ngIf", "ngIfElse"], [1, "transactions-list"], ["class", "transaction-item", 4, "ngFor", "ngForOf"], [1, "transaction-item"], [1, "transaction-info"], [1, "transaction-desc"], [1, "transaction-points", 3, "ngClass"], [1, "empty-state"], [1, "events-list"], ["class", "event-item", 4, "ngFor", "ngForOf"], [1, "event-item"], [1, "event-icon"], ["d", "M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"], [1, "event-info"], [1, "event-name"], [1, "event-badge", 3, "ngClass"], [1, "event-date"], [1, "dashboard-grid-bottom"], [1, "card", "rewards-card"], [1, "card-body", "rewards-content"], [1, "rewards-title"], [1, "rewards-illustration"], ["viewBox", "0 0 200 120", "fill", "none", "xmlns", "http://www.w3.org/2000/svg"], ["x", "20", "y", "40", "width", "50", "height", "50", "fill", "#2c5f3f", "rx", "4"], ["x", "20", "y", "35", "width", "50", "height", "10", "fill", "#1e4620", "rx", "2"], ["x", "42", "y", "25", "width", "6", "height", "20", "fill", "#1e4620"], ["x", "80", "y", "50", "width", "40", "height", "40", "fill", "#d97706", "rx", "4"], ["x", "80", "y", "45", "width", "40", "height", "10", "fill", "#b45309", "rx", "2"], ["x", "97", "y", "35", "width", "6", "height", "20", "fill", "#b45309"], ["x", "130", "y", "30", "width", "55", "height", "55", "fill", "#0284c7", "rx", "4"], ["x", "130", "y", "25", "width", "55", "height", "10", "fill", "#0369a1", "rx", "2"], ["x", "155", "y", "15", "width", "6", "height", "20", "fill", "#0369a1"], [1, "btn-primary", "rewards-btn", 3, "click"], ["class", "card", 4, "ngIf"], [1, "redemption-status-grid"], [1, "status-item"], [1, "status-icon", "pending"], ["d", "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"], [1, "status-info"], [1, "status-label"], [1, "status-count"], [1, "status-unit"], [1, "status-icon", "approved"], ["d", "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"], [1, "status-icon", "delivered"], ["d", "M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM10 17l-3.5-3.5 1.41-1.41L10 14.17l6.09-6.09L17.5 9.5 10 17z"]], template: function UserDashboardComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 2);
            i0.ɵɵelement(1, "app-user-sidebar");
            i0.ɵɵelementStart(2, "div", 3)(3, "div", 4)(4, "div", 5);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(5, "svg", 6);
            i0.ɵɵelement(6, "circle", 7)(7, "path", 8);
            i0.ɵɵelementEnd();
            i0.ɵɵnamespaceHTML();
            i0.ɵɵelementStart(8, "input", 9);
            i0.ɵɵtwoWayListener("ngModelChange", function UserDashboardComponent_Template_input_ngModelChange_8_listener($event) { i0.ɵɵtwoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event); return $event; });
            i0.ɵɵlistener("input", function UserDashboardComponent_Template_input_input_8_listener() { return ctx.onSearch(ctx.searchQuery); });
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "div", 10)(10, "div", 11)(11, "span", 12);
            i0.ɵɵtext(12, "Employee");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(13, "div", 13);
            i0.ɵɵtext(14);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(15, "button", 14);
            i0.ɵɵlistener("click", function UserDashboardComponent_Template_button_click_15_listener() { return ctx.logout(); });
            i0.ɵɵtext(16, "Logout");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(17, "div", 15)(18, "h1", 16);
            i0.ɵɵtext(19, "Dashboard");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(20, UserDashboardComponent_div_20_Template, 5, 1, "div", 17)(21, UserDashboardComponent_div_21_Template, 4, 0, "div", 18)(22, UserDashboardComponent_div_22_Template, 48, 10, "div", 19)(23, UserDashboardComponent_div_23_Template, 23, 4, "div", 20)(24, UserDashboardComponent_div_24_Template, 19, 1, "div", 21);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(8);
            i0.ɵɵtwoWayProperty("ngModel", ctx.searchQuery);
            i0.ɵɵadvance(6);
            i0.ɵɵtextInterpolate2(" ", (ctx.currentUser == null ? null : ctx.currentUser.firstName == null ? null : ctx.currentUser.firstName.charAt(0)) || "", "", (ctx.currentUser == null ? null : ctx.currentUser.lastName == null ? null : ctx.currentUser.lastName.charAt(0)) || "", " ");
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("ngIf", ctx.errorMessage);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading && ctx.stats);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading);
        } }, dependencies: [CommonModule, i4.NgClass, i4.NgForOf, i4.NgIf, FormsModule, i5.DefaultValueAccessor, i5.NgControlStatus, i5.NgModel, UserSidebarComponent, i4.DecimalPipe, i4.DatePipe], styles: [".user-dashboard-wrapper[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  height: 100vh;\r\n  background: var(--ag-color-field-01);\r\n}\r\n\r\n.user-dashboard-main[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  display: flex;\r\n  flex-direction: column;\r\n  overflow: hidden;\r\n}\r\n\r\n\n\r\n.loading-indicator[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  padding: 60px 20px;\r\n  gap: 16px;\r\n}\r\n\r\n.spinner[_ngcontent-%COMP%] {\r\n  width: 40px;\r\n  height: 40px;\r\n  border: 4px solid var(--ag-color-border-subtle);\r\n  border-top-color: var(--ag-button-primary);\r\n  border-radius: 50%;\r\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\r\n}\r\n\r\n@keyframes _ngcontent-%COMP%_spin {\r\n  to {\r\n    transform: rotate(360deg);\r\n  }\r\n}\r\n\r\n.loading-indicator[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-body-01);\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n\n\r\n.error-alert[_ngcontent-%COMP%] {\r\n  background: var(--ag-tag-red-bg);\r\n  border: 1px solid var(--ag-color-support-error);\r\n  border-radius: 8px;\r\n  padding: 16px;\r\n  margin-bottom: 24px;\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n  color: var(--ag-tag-red-text);\r\n}\r\n\r\n.error-alert[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\r\n  width: 20px;\r\n  height: 20px;\r\n  flex-shrink: 0;\r\n}\r\n\r\n\n\r\n.dashboard-header[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-layer-01);\r\n  border-bottom: 1px solid var(--ag-color-border-subtle);\r\n  padding: 20px 40px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  gap: 20px;\r\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.search-container[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  min-width: 300px;\r\n  position: relative;\r\n}\r\n\r\n.search-icon[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  left: 12px;\r\n  top: 50%;\r\n  transform: translateY(-50%);\r\n  width: 20px;\r\n  height: 20px;\r\n  color: var(--ag-color-text-placeholder);\r\n  stroke-width: 2;\r\n}\r\n\r\n.search-input[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  padding: 10px 12px 10px 40px;\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 6px;\r\n  font: var(--ag-typo-body-02);\r\n  transition: all 0.2s;\r\n}\r\n\r\n.search-input[_ngcontent-%COMP%]:focus {\r\n  outline: none;\r\n  border-color: var(--ag-button-primary);\r\n  box-shadow: 0 0 0 3px rgba(44, 95, 63, 0.1);\r\n}\r\n\r\n.header-right[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 20px;\r\n}\r\n\r\n.user-menu[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n}\r\n\r\n.user-label[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 500;\r\n  color: var(--ag-color-text-primary);\r\n}\r\n\r\n.user-avatar-small[_ngcontent-%COMP%] {\r\n  width: 36px;\r\n  height: 36px;\r\n  border-radius: 50%;\r\n  background: var(--ag-button-primary);\r\n  color: var(--ag-color-layer-01);\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 600;\r\n}\r\n\r\n.logout-btn[_ngcontent-%COMP%] {\r\n  padding: 10px 20px;\r\n  background: var(--ag-color-layer-01);\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  color: var(--ag-color-text-secondary);\r\n  border-radius: 6px;\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 500;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.logout-btn[_ngcontent-%COMP%]:hover {\r\n  background: var(--ag-color-field-01);\r\n  border-color: var(--ag-color-text-placeholder);\r\n}\r\n\r\n\n\r\n.dashboard-content[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  overflow-y: auto;\r\n  padding: 40px;\r\n}\r\n\r\n.page-title[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-h2);\r\n  font-weight: 700;\r\n  color: var(--ag-color-text-primary);\r\n  margin-bottom: 32px;\r\n}\r\n\r\n\n\r\n.stats-grid[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\r\n  gap: 20px;\r\n  margin-bottom: 40px;\r\n}\r\n\r\n.stat-card[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-layer-01);\r\n  border-radius: 8px;\r\n  padding: 24px;\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 20px;\r\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  transition: all 0.2s;\r\n}\r\n\r\n.stat-card[_ngcontent-%COMP%]:hover {\r\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\r\n  border-color: var(--ag-color-border-subtle);\r\n}\r\n\r\n.stat-card.primary[_ngcontent-%COMP%] {\r\n  background: linear-gradient(135deg, var(--ag-button-primary) 0%, var(--ag-button-primary-hover) 100%);\r\n  color: var(--ag-color-layer-01);\r\n  border: none;\r\n}\r\n\r\n.stat-card.primary[_ngcontent-%COMP%]   .stat-label[_ngcontent-%COMP%] {\r\n  color: rgba(255, 255, 255, 0.9);\r\n}\r\n\r\n.stat-card.primary[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%] {\r\n  color: var(--ag-color-layer-01);\r\n}\r\n\r\n.stat-card.primary[_ngcontent-%COMP%]   .stat-unit[_ngcontent-%COMP%] {\r\n  color: rgba(255, 255, 255, 0.8);\r\n}\r\n\r\n.stat-icon[_ngcontent-%COMP%] {\r\n  width: 60px;\r\n  height: 60px;\r\n  border-radius: 12px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  flex-shrink: 0;\r\n}\r\n\r\n.stat-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\r\n  width: 32px;\r\n  height: 32px;\r\n}\r\n\r\n.stat-icon.balance[_ngcontent-%COMP%] {\r\n  background: rgba(255, 255, 255, 0.2);\r\n  color: var(--ag-color-layer-01);\r\n}\r\n\r\n.stat-icon.earned[_ngcontent-%COMP%] {\r\n  background: var(--ag-tag-green-bg);\r\n  color: var(--ag-color-support-success);\r\n}\r\n\r\n.stat-icon.redeemed[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-support-caution-major);\r\n  color: var(--ag-color-support-caution-major);\r\n}\r\n\r\n.stat-icon.events[_ngcontent-%COMP%] {\r\n  background: var(--ag-tag-blue-bg);\r\n  color: var(--ag-color-support-info);\r\n}\r\n\r\n.stat-info[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n}\r\n\r\n.stat-label[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-label);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-secondary);\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.5px;\r\n  margin-bottom: 8px;\r\n  display: block;\r\n}\r\n\r\n.stat-value[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-h2);\r\n  font-weight: 700;\r\n  color: var(--ag-color-text-primary);\r\n  margin: 0;\r\n  line-height: 1;\r\n}\r\n\r\n.stat-unit[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  font-weight: 500;\r\n  display: block;\r\n  margin-top: 4px;\r\n}\r\n\r\n\n\r\n.dashboard-grid[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));\r\n  gap: 24px;\r\n  margin-bottom: 24px;\r\n}\r\n\r\n.dashboard-grid-bottom[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));\r\n  gap: 24px;\r\n}\r\n\r\n.card[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-layer-01);\r\n  border-radius: 8px;\r\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  overflow: hidden;\r\n}\r\n\r\n.card-header[_ngcontent-%COMP%] {\r\n  padding: 20px 24px;\r\n  border-bottom: 1px solid var(--ag-color-border-subtle);\r\n}\r\n\r\n.card-title[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-h4);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-primary);\r\n  margin: 0;\r\n}\r\n\r\n.card-body[_ngcontent-%COMP%] {\r\n  padding: 24px;\r\n}\r\n\r\n.card-footer[_ngcontent-%COMP%] {\r\n  padding: 16px 24px;\r\n  border-top: 1px solid var(--ag-color-border-subtle);\r\n  display: flex;\r\n  justify-content: flex-end;\r\n}\r\n\r\n.btn-link[_ngcontent-%COMP%] {\r\n  background: none;\r\n  border: none;\r\n  color: var(--ag-button-primary);\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 4px;\r\n}\r\n\r\n.btn-link[_ngcontent-%COMP%]:hover {\r\n  color: var(--ag-button-primary-hover);\r\n  text-decoration: underline;\r\n}\r\n\r\n\n\r\n.transactions-list[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 16px;\r\n}\r\n\r\n.transaction-item[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  padding: 12px 0;\r\n  border-bottom: 1px solid var(--ag-color-field-01);\r\n}\r\n\r\n.transaction-item[_ngcontent-%COMP%]:last-child {\r\n  border-bottom: none;\r\n}\r\n\r\n.transaction-info[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n}\r\n\r\n.transaction-desc[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-primary);\r\n  font-weight: 500;\r\n}\r\n\r\n.transaction-points[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 600;\r\n}\r\n\r\n.transaction-points.positive[_ngcontent-%COMP%] {\r\n  color: var(--ag-color-support-success);\r\n}\r\n\r\n.transaction-points.negative[_ngcontent-%COMP%] {\r\n  color: var(--ag-color-support-error);\r\n}\r\n\r\n\n\r\n.events-list[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 16px;\r\n}\r\n\r\n.event-item[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 16px;\r\n  padding: 12px 0;\r\n  border-bottom: 1px solid var(--ag-color-field-01);\r\n}\r\n\r\n.event-item[_ngcontent-%COMP%]:last-child {\r\n  border-bottom: none;\r\n}\r\n\r\n.event-icon[_ngcontent-%COMP%] {\r\n  width: 40px;\r\n  height: 40px;\r\n  border-radius: 8px;\r\n  background: var(--ag-tag-green-bg);\r\n  color: var(--ag-button-primary);\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  flex-shrink: 0;\r\n}\r\n\r\n.event-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\r\n  width: 24px;\r\n  height: 24px;\r\n}\r\n\r\n.event-info[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  min-width: 0;\r\n}\r\n\r\n.event-name[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-primary);\r\n  margin: 0 0 6px 0;\r\n}\r\n\r\n.event-badge[_ngcontent-%COMP%] {\r\n  display: inline-block;\r\n  padding: 4px 12px;\r\n  border-radius: 12px;\r\n  font: var(--ag-typo-label);\r\n  font-weight: 600;\r\n}\r\n\r\n.event-badge.registered[_ngcontent-%COMP%] {\r\n  background: var(--ag-tag-green-bg);\r\n  color: var(--ag-color-support-success);\r\n}\r\n\r\n.event-badge.spots-left[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-support-caution-major);\r\n  color: var(--ag-color-support-caution-major);\r\n}\r\n\r\n.event-badge.available[_ngcontent-%COMP%] {\r\n  background: var(--ag-tag-blue-bg);\r\n  color: var(--ag-color-support-info);\r\n}\r\n\r\n.event-date[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-helper-text);\r\n  color: var(--ag-color-text-secondary);\r\n  white-space: nowrap;\r\n}\r\n\r\n\n\r\n.rewards-card[_ngcontent-%COMP%] {\r\n  background: linear-gradient(135deg, var(--ag-color-field-01) 0%, var(--ag-color-field-01) 100%);\r\n}\r\n\r\n.rewards-content[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  text-align: center;\r\n  padding: 32px 24px;\r\n}\r\n\r\n.rewards-title[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-h4);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-primary);\r\n  margin: 0 0 24px 0;\r\n}\r\n\r\n.rewards-illustration[_ngcontent-%COMP%] {\r\n  margin-bottom: 24px;\r\n  opacity: 0.9;\r\n}\r\n\r\n.btn-primary[_ngcontent-%COMP%] {\r\n  padding: 12px 32px;\r\n  background: var(--ag-button-primary);\r\n  color: var(--ag-color-layer-01);\r\n  border: none;\r\n  border-radius: 6px;\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n  display: inline-flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n}\r\n\r\n.btn-primary[_ngcontent-%COMP%]:hover {\r\n  background: var(--ag-button-primary-hover);\r\n  transform: translateY(-1px);\r\n  box-shadow: 0 4px 12px rgba(44, 95, 63, 0.3);\r\n}\r\n\r\n\n\r\n.redemption-status-grid[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 20px;\r\n}\r\n\r\n.status-item[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 16px;\r\n}\r\n\r\n.status-icon[_ngcontent-%COMP%] {\r\n  width: 48px;\r\n  height: 48px;\r\n  border-radius: 10px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  flex-shrink: 0;\r\n}\r\n\r\n.status-icon[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\r\n  width: 28px;\r\n  height: 28px;\r\n}\r\n\r\n.status-icon.pending[_ngcontent-%COMP%] {\r\n  background: var(--ag-color-support-caution-major);\r\n  color: var(--ag-color-support-caution-major);\r\n}\r\n\r\n.status-icon.approved[_ngcontent-%COMP%] {\r\n  background: var(--ag-tag-green-bg);\r\n  color: var(--ag-color-support-success);\r\n}\r\n\r\n.status-icon.delivered[_ngcontent-%COMP%] {\r\n  background: var(--ag-tag-blue-bg);\r\n  color: var(--ag-color-support-info);\r\n}\r\n\r\n.status-info[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.status-label[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-helper-text);\r\n  color: var(--ag-color-text-secondary);\r\n  font-weight: 500;\r\n  margin-bottom: 4px;\r\n}\r\n\r\n.status-count[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-h3);\r\n  font-weight: 700;\r\n  color: var(--ag-color-text-primary);\r\n  line-height: 1;\r\n}\r\n\r\n.status-unit[_ngcontent-%COMP%] {\r\n  font: var(--ag-typo-label);\r\n  color: var(--ag-color-text-placeholder);\r\n  margin-top: 2px;\r\n}\r\n\r\n\n\r\n.empty-state[_ngcontent-%COMP%] {\r\n  text-align: center;\r\n  color: var(--ag-color-text-placeholder);\r\n  font: var(--ag-typo-body-02);\r\n  padding: 40px 20px;\r\n  margin: 0;\r\n}\r\n\r\n\n\r\n@media (max-width: 1024px) {\r\n  .stats-grid[_ngcontent-%COMP%] {\r\n    grid-template-columns: repeat(2, 1fr);\r\n  }\r\n\r\n  .dashboard-grid[_ngcontent-%COMP%], \r\n   .dashboard-grid-bottom[_ngcontent-%COMP%] {\r\n    grid-template-columns: 1fr;\r\n  }\r\n}\r\n\r\n@media (max-width: 768px) {\r\n  .dashboard-content[_ngcontent-%COMP%] {\r\n    padding: 20px;\r\n  }\r\n\r\n  .page-title[_ngcontent-%COMP%] {\r\n    font: var(--ag-typo-h3);\r\n    margin-bottom: 24px;\r\n  }\r\n\r\n  .stats-grid[_ngcontent-%COMP%] {\r\n    grid-template-columns: 1fr;\r\n    gap: 16px;\r\n  }\r\n\r\n  .dashboard-header[_ngcontent-%COMP%] {\r\n    padding: 16px 20px;\r\n    flex-direction: column;\r\n    align-items: stretch;\r\n  }\r\n\r\n  .search-container[_ngcontent-%COMP%] {\r\n    min-width: unset;\r\n  }\r\n\r\n  .header-right[_ngcontent-%COMP%] {\r\n    justify-content: space-between;\r\n  }\r\n}"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UserDashboardComponent, [{
        type: Component,
        args: [{ selector: 'app-user-dashboard', standalone: true, imports: [CommonModule, FormsModule, UserSidebarComponent], template: "<div class=\"user-dashboard-wrapper\">\r\n  <app-user-sidebar></app-user-sidebar>\r\n\r\n  <div class=\"user-dashboard-main\">\r\n    <!-- Top Header -->\r\n    <div class=\"dashboard-header\">\r\n      <div class=\"search-container\">\r\n        <svg class=\"search-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\">\r\n          <circle cx=\"11\" cy=\"11\" r=\"8\"></circle>\r\n          <path d=\"m21 21-4.35-4.35\"></path>\r\n        </svg>\r\n        <input\r\n          type=\"text\"\r\n          class=\"search-input\"\r\n          placeholder=\"Search...\"\r\n          [(ngModel)]=\"searchQuery\"\r\n          (input)=\"onSearch(searchQuery)\"\r\n        />\r\n      </div>\r\n\r\n      <div class=\"header-right\">\r\n        <div class=\"user-menu\">\r\n          <span class=\"user-label\">Employee</span>\r\n          <div class=\"user-avatar-small\">\r\n            {{ currentUser?.firstName?.charAt(0) || '' }}{{ currentUser?.lastName?.charAt(0) || '' }}\r\n          </div>\r\n        </div>\r\n        <button class=\"logout-btn\" (click)=\"logout()\">Logout</button>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- Dashboard Content -->\r\n    <div class=\"dashboard-content\">\r\n      <h1 class=\"page-title\">Dashboard</h1>\r\n\r\n      <!-- Error Message -->\r\n      <div *ngIf=\"errorMessage\" class=\"error-alert\">\r\n        <svg viewBox=\"0 0 24 24\" fill=\"currentColor\">\r\n          <path d=\"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z\"/>\r\n        </svg>\r\n        <span>{{ errorMessage }}</span>\r\n      </div>\r\n\r\n      <!-- Loading Indicator -->\r\n      <div *ngIf=\"isLoading\" class=\"loading-indicator\">\r\n        <div class=\"spinner\"></div>\r\n        <p>Loading dashboard data...</p>\r\n      </div>\r\n\r\n      <!-- Points Summary Cards (Top Row) -->\r\n      <div class=\"stats-grid\" *ngIf=\"!isLoading && stats\">\r\n        <!-- Current Balance Card - Primary -->\r\n        <div class=\"stat-card primary\">\r\n          <div class=\"stat-icon balance\">\r\n            <svg viewBox=\"0 0 24 24\" fill=\"currentColor\">\r\n              <path d=\"M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z\"/>\r\n            </svg>\r\n          </div>\r\n          <div class=\"stat-info\">\r\n            <h3 class=\"stat-label\">Current Balance</h3>\r\n            <p class=\"stat-value\">{{ stats.currentBalance | number }}</p>\r\n            <span class=\"stat-unit\">Points</span>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Points Earned Card -->\r\n        <div class=\"stat-card\">\r\n          <div class=\"stat-icon earned\">\r\n            <svg viewBox=\"0 0 24 24\" fill=\"currentColor\">\r\n              <path d=\"M7 14l5-5 5 5z\"/>\r\n            </svg>\r\n          </div>\r\n          <div class=\"stat-info\">\r\n            <h3 class=\"stat-label\">Points Earned</h3>\r\n            <p class=\"stat-value\">{{ stats.pointsEarned | number }}</p>\r\n            <span class=\"stat-unit\">Points</span>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Points Redeemed Card -->\r\n        <div class=\"stat-card\">\r\n          <div class=\"stat-icon redeemed\">\r\n            <svg viewBox=\"0 0 24 24\" fill=\"currentColor\">\r\n              <path d=\"M7 10l5 5 5-5z\"/>\r\n            </svg>\r\n          </div>\r\n          <div class=\"stat-info\">\r\n            <h3 class=\"stat-label\">Points Redeemed</h3>\r\n            <p class=\"stat-value\">{{ stats.pointsRedeemed | number }}</p>\r\n            <span class=\"stat-unit\">Points</span>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Events Registered Card -->\r\n        <div class=\"stat-card\">\r\n          <div class=\"stat-icon events\">\r\n            <svg viewBox=\"0 0 24 24\" fill=\"currentColor\">\r\n              <path d=\"M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z\"/>\r\n            </svg>\r\n          </div>\r\n          <div class=\"stat-info\">\r\n            <h3 class=\"stat-label\">Events Registered</h3>\r\n            <p class=\"stat-value\">{{ stats.eventsRegistered }}</p>\r\n            <span class=\"stat-unit\">Events</span>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <!-- Middle Section: Recent Transactions & Upcoming Events -->\r\n      <div class=\"dashboard-grid\" *ngIf=\"!isLoading\">\r\n        <!-- Recent Transactions -->\r\n        <div class=\"card\">\r\n          <div class=\"card-header\">\r\n            <h2 class=\"card-title\">Recent Transactions</h2>\r\n          </div>\r\n          <div class=\"card-body\">\r\n            <div class=\"transactions-list\" *ngIf=\"recentTransactions && recentTransactions.length > 0; else noTransactions\">\r\n              <div class=\"transaction-item\" *ngFor=\"let transaction of recentTransactions\">\r\n                <div class=\"transaction-info\">\r\n                  <span class=\"transaction-desc\">{{ transaction.description || transaction.type }}</span>\r\n                </div>\r\n                <span class=\"transaction-points\" [ngClass]=\"getTransactionClass(transaction.points)\">\r\n                  {{ transaction.points >= 0 ? '+' : '' }}{{ transaction.points | number }} Points\r\n                </span>\r\n              </div>\r\n            </div>\r\n            <ng-template #noTransactions>\r\n              <p class=\"empty-state\">No transactions yet</p>\r\n            </ng-template>\r\n          </div>\r\n          <div class=\"card-footer\">\r\n            <button class=\"btn-link\" (click)=\"viewAllTransactions()\">View All \u2192</button>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Upcoming Events -->\r\n        <div class=\"card\">\r\n          <div class=\"card-header\">\r\n            <h2 class=\"card-title\">Upcoming Events</h2>\r\n          </div>\r\n          <div class=\"card-body\">\r\n            <div class=\"events-list\" *ngIf=\"upcomingEvents && upcomingEvents.length > 0; else noEvents\">\r\n              <div class=\"event-item\" *ngFor=\"let event of upcomingEvents\">\r\n                <div class=\"event-icon\">\r\n                  <svg viewBox=\"0 0 24 24\" fill=\"currentColor\">\r\n                    <path d=\"M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z\"/>\r\n                  </svg>\r\n                </div>\r\n                <div class=\"event-info\">\r\n                  <h3 class=\"event-name\">{{ event.name }}</h3>\r\n                  <span class=\"event-badge\" [ngClass]=\"getEventStatusBadgeClass(event)\">\r\n                    {{ getEventStatusText(event) }}\r\n                  </span>\r\n                </div>\r\n                <div class=\"event-date\">\r\n                  {{ event.eventDate | date: 'MMM d, yyyy' }}\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <ng-template #noEvents>\r\n              <p class=\"empty-state\">No upcoming events</p>\r\n            </ng-template>\r\n          </div>\r\n          <div class=\"card-footer\">\r\n            <button class=\"btn-link\" (click)=\"viewAllEvents()\">See All \u2192</button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <!-- Bottom Section: Top Rewards & Redemption Status -->\r\n      <div class=\"dashboard-grid-bottom\" *ngIf=\"!isLoading\">\r\n        <!-- Top Rewards Available -->\r\n        <div class=\"card rewards-card\">\r\n          <div class=\"card-body rewards-content\">\r\n            <h2 class=\"rewards-title\">Top Rewards Available</h2>\r\n            <div class=\"rewards-illustration\">\r\n              <svg viewBox=\"0 0 200 120\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\r\n                <!-- Gift boxes illustration -->\r\n                <rect x=\"20\" y=\"40\" width=\"50\" height=\"50\" fill=\"#2c5f3f\" rx=\"4\"/>\r\n                <rect x=\"20\" y=\"35\" width=\"50\" height=\"10\" fill=\"#1e4620\" rx=\"2\"/>\r\n                <rect x=\"42\" y=\"25\" width=\"6\" height=\"20\" fill=\"#1e4620\"/>\r\n                \r\n                <rect x=\"80\" y=\"50\" width=\"40\" height=\"40\" fill=\"#d97706\" rx=\"4\"/>\r\n                <rect x=\"80\" y=\"45\" width=\"40\" height=\"10\" fill=\"#b45309\" rx=\"2\"/>\r\n                <rect x=\"97\" y=\"35\" width=\"6\" height=\"20\" fill=\"#b45309\"/>\r\n                \r\n                <rect x=\"130\" y=\"30\" width=\"55\" height=\"55\" fill=\"#0284c7\" rx=\"4\"/>\r\n                <rect x=\"130\" y=\"25\" width=\"55\" height=\"10\" fill=\"#0369a1\" rx=\"2\"/>\r\n                <rect x=\"155\" y=\"15\" width=\"6\" height=\"20\" fill=\"#0369a1\"/>\r\n              </svg>\r\n            </div>\r\n            <button class=\"btn-primary rewards-btn\" (click)=\"browseRewards()\">\r\n              Browse Rewards \u2192\r\n            </button>\r\n          </div>\r\n        </div>\r\n\r\n        <!-- Redemption Status -->\r\n        <div class=\"card\" *ngIf=\"redemptionCounts\">\r\n          <div class=\"card-header\">\r\n            <h2 class=\"card-title\">Redemption Status</h2>\r\n          </div>\r\n          <div class=\"card-body\">\r\n            <div class=\"redemption-status-grid\">\r\n              <div class=\"status-item\">\r\n                <div class=\"status-icon pending\">\r\n                  <svg viewBox=\"0 0 24 24\" fill=\"currentColor\">\r\n                    <path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z\"/>\r\n                  </svg>\r\n                </div>\r\n                <div class=\"status-info\">\r\n                  <span class=\"status-label\">Pending Approvals</span>\r\n                  <span class=\"status-count\">{{ redemptionCounts.pending }}</span>\r\n                  <span class=\"status-unit\">Requests</span>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"status-item\">\r\n                <div class=\"status-icon approved\">\r\n                  <svg viewBox=\"0 0 24 24\" fill=\"currentColor\">\r\n                    <path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z\"/>\r\n                  </svg>\r\n                </div>\r\n                <div class=\"status-info\">\r\n                  <span class=\"status-label\">Approved</span>\r\n                  <span class=\"status-count\">{{ redemptionCounts.approved }}</span>\r\n                  <span class=\"status-unit\">Redemptions</span>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"status-item\">\r\n                <div class=\"status-icon delivered\">\r\n                  <svg viewBox=\"0 0 24 24\" fill=\"currentColor\">\r\n                    <path d=\"M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM10 17l-3.5-3.5 1.41-1.41L10 14.17l6.09-6.09L17.5 9.5 10 17z\"/>\r\n                  </svg>\r\n                </div>\r\n                <div class=\"status-info\">\r\n                  <span class=\"status-label\">Delivered</span>\r\n                  <span class=\"status-count\">{{ redemptionCounts.delivered }}</span>\r\n                  <span class=\"status-unit\">Shipment</span>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".user-dashboard-wrapper {\r\n  display: flex;\r\n  height: 100vh;\r\n  background: var(--ag-color-field-01);\r\n}\r\n\r\n.user-dashboard-main {\r\n  flex: 1;\r\n  display: flex;\r\n  flex-direction: column;\r\n  overflow: hidden;\r\n}\r\n\r\n/* Loading Indicator */\r\n.loading-indicator {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  padding: 60px 20px;\r\n  gap: 16px;\r\n}\r\n\r\n.spinner {\r\n  width: 40px;\r\n  height: 40px;\r\n  border: 4px solid var(--ag-color-border-subtle);\r\n  border-top-color: var(--ag-button-primary);\r\n  border-radius: 50%;\r\n  animation: spin 0.8s linear infinite;\r\n}\r\n\r\n@keyframes spin {\r\n  to {\r\n    transform: rotate(360deg);\r\n  }\r\n}\r\n\r\n.loading-indicator p {\r\n  font: var(--ag-typo-body-01);\r\n  color: var(--ag-color-text-secondary);\r\n}\r\n\r\n/* Error Alert */\r\n.error-alert {\r\n  background: var(--ag-tag-red-bg);\r\n  border: 1px solid var(--ag-color-support-error);\r\n  border-radius: 8px;\r\n  padding: 16px;\r\n  margin-bottom: 24px;\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n  color: var(--ag-tag-red-text);\r\n}\r\n\r\n.error-alert svg {\r\n  width: 20px;\r\n  height: 20px;\r\n  flex-shrink: 0;\r\n}\r\n\r\n/* Header */\r\n.dashboard-header {\r\n  background: var(--ag-color-layer-01);\r\n  border-bottom: 1px solid var(--ag-color-border-subtle);\r\n  padding: 20px 40px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  gap: 20px;\r\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.search-container {\r\n  flex: 1;\r\n  min-width: 300px;\r\n  position: relative;\r\n}\r\n\r\n.search-icon {\r\n  position: absolute;\r\n  left: 12px;\r\n  top: 50%;\r\n  transform: translateY(-50%);\r\n  width: 20px;\r\n  height: 20px;\r\n  color: var(--ag-color-text-placeholder);\r\n  stroke-width: 2;\r\n}\r\n\r\n.search-input {\r\n  width: 100%;\r\n  padding: 10px 12px 10px 40px;\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  border-radius: 6px;\r\n  font: var(--ag-typo-body-02);\r\n  transition: all 0.2s;\r\n}\r\n\r\n.search-input:focus {\r\n  outline: none;\r\n  border-color: var(--ag-button-primary);\r\n  box-shadow: 0 0 0 3px rgba(44, 95, 63, 0.1);\r\n}\r\n\r\n.header-right {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 20px;\r\n}\r\n\r\n.user-menu {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n}\r\n\r\n.user-label {\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 500;\r\n  color: var(--ag-color-text-primary);\r\n}\r\n\r\n.user-avatar-small {\r\n  width: 36px;\r\n  height: 36px;\r\n  border-radius: 50%;\r\n  background: var(--ag-button-primary);\r\n  color: var(--ag-color-layer-01);\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 600;\r\n}\r\n\r\n.logout-btn {\r\n  padding: 10px 20px;\r\n  background: var(--ag-color-layer-01);\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  color: var(--ag-color-text-secondary);\r\n  border-radius: 6px;\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 500;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.logout-btn:hover {\r\n  background: var(--ag-color-field-01);\r\n  border-color: var(--ag-color-text-placeholder);\r\n}\r\n\r\n/* Content */\r\n.dashboard-content {\r\n  flex: 1;\r\n  overflow-y: auto;\r\n  padding: 40px;\r\n}\r\n\r\n.page-title {\r\n  font: var(--ag-typo-h2);\r\n  font-weight: 700;\r\n  color: var(--ag-color-text-primary);\r\n  margin-bottom: 32px;\r\n}\r\n\r\n/* Stats Grid - Top Row */\r\n.stats-grid {\r\n  display: grid;\r\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\r\n  gap: 20px;\r\n  margin-bottom: 40px;\r\n}\r\n\r\n.stat-card {\r\n  background: var(--ag-color-layer-01);\r\n  border-radius: 8px;\r\n  padding: 24px;\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 20px;\r\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  transition: all 0.2s;\r\n}\r\n\r\n.stat-card:hover {\r\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\r\n  border-color: var(--ag-color-border-subtle);\r\n}\r\n\r\n.stat-card.primary {\r\n  background: linear-gradient(135deg, var(--ag-button-primary) 0%, var(--ag-button-primary-hover) 100%);\r\n  color: var(--ag-color-layer-01);\r\n  border: none;\r\n}\r\n\r\n.stat-card.primary .stat-label {\r\n  color: rgba(255, 255, 255, 0.9);\r\n}\r\n\r\n.stat-card.primary .stat-value {\r\n  color: var(--ag-color-layer-01);\r\n}\r\n\r\n.stat-card.primary .stat-unit {\r\n  color: rgba(255, 255, 255, 0.8);\r\n}\r\n\r\n.stat-icon {\r\n  width: 60px;\r\n  height: 60px;\r\n  border-radius: 12px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  flex-shrink: 0;\r\n}\r\n\r\n.stat-icon svg {\r\n  width: 32px;\r\n  height: 32px;\r\n}\r\n\r\n.stat-icon.balance {\r\n  background: rgba(255, 255, 255, 0.2);\r\n  color: var(--ag-color-layer-01);\r\n}\r\n\r\n.stat-icon.earned {\r\n  background: var(--ag-tag-green-bg);\r\n  color: var(--ag-color-support-success);\r\n}\r\n\r\n.stat-icon.redeemed {\r\n  background: var(--ag-color-support-caution-major);\r\n  color: var(--ag-color-support-caution-major);\r\n}\r\n\r\n.stat-icon.events {\r\n  background: var(--ag-tag-blue-bg);\r\n  color: var(--ag-color-support-info);\r\n}\r\n\r\n.stat-info {\r\n  flex: 1;\r\n}\r\n\r\n.stat-label {\r\n  font: var(--ag-typo-label);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-secondary);\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.5px;\r\n  margin-bottom: 8px;\r\n  display: block;\r\n}\r\n\r\n.stat-value {\r\n  font: var(--ag-typo-h2);\r\n  font-weight: 700;\r\n  color: var(--ag-color-text-primary);\r\n  margin: 0;\r\n  line-height: 1;\r\n}\r\n\r\n.stat-unit {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-secondary);\r\n  font-weight: 500;\r\n  display: block;\r\n  margin-top: 4px;\r\n}\r\n\r\n/* Dashboard Grid - Middle Section */\r\n.dashboard-grid {\r\n  display: grid;\r\n  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));\r\n  gap: 24px;\r\n  margin-bottom: 24px;\r\n}\r\n\r\n.dashboard-grid-bottom {\r\n  display: grid;\r\n  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));\r\n  gap: 24px;\r\n}\r\n\r\n.card {\r\n  background: var(--ag-color-layer-01);\r\n  border-radius: 8px;\r\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);\r\n  border: 1px solid var(--ag-color-border-subtle);\r\n  overflow: hidden;\r\n}\r\n\r\n.card-header {\r\n  padding: 20px 24px;\r\n  border-bottom: 1px solid var(--ag-color-border-subtle);\r\n}\r\n\r\n.card-title {\r\n  font: var(--ag-typo-h4);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-primary);\r\n  margin: 0;\r\n}\r\n\r\n.card-body {\r\n  padding: 24px;\r\n}\r\n\r\n.card-footer {\r\n  padding: 16px 24px;\r\n  border-top: 1px solid var(--ag-color-border-subtle);\r\n  display: flex;\r\n  justify-content: flex-end;\r\n}\r\n\r\n.btn-link {\r\n  background: none;\r\n  border: none;\r\n  color: var(--ag-button-primary);\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 4px;\r\n}\r\n\r\n.btn-link:hover {\r\n  color: var(--ag-button-primary-hover);\r\n  text-decoration: underline;\r\n}\r\n\r\n/* Transactions List */\r\n.transactions-list {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 16px;\r\n}\r\n\r\n.transaction-item {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  padding: 12px 0;\r\n  border-bottom: 1px solid var(--ag-color-field-01);\r\n}\r\n\r\n.transaction-item:last-child {\r\n  border-bottom: none;\r\n}\r\n\r\n.transaction-info {\r\n  flex: 1;\r\n}\r\n\r\n.transaction-desc {\r\n  font: var(--ag-typo-body-02);\r\n  color: var(--ag-color-text-primary);\r\n  font-weight: 500;\r\n}\r\n\r\n.transaction-points {\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 600;\r\n}\r\n\r\n.transaction-points.positive {\r\n  color: var(--ag-color-support-success);\r\n}\r\n\r\n.transaction-points.negative {\r\n  color: var(--ag-color-support-error);\r\n}\r\n\r\n/* Events List */\r\n.events-list {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 16px;\r\n}\r\n\r\n.event-item {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 16px;\r\n  padding: 12px 0;\r\n  border-bottom: 1px solid var(--ag-color-field-01);\r\n}\r\n\r\n.event-item:last-child {\r\n  border-bottom: none;\r\n}\r\n\r\n.event-icon {\r\n  width: 40px;\r\n  height: 40px;\r\n  border-radius: 8px;\r\n  background: var(--ag-tag-green-bg);\r\n  color: var(--ag-button-primary);\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  flex-shrink: 0;\r\n}\r\n\r\n.event-icon svg {\r\n  width: 24px;\r\n  height: 24px;\r\n}\r\n\r\n.event-info {\r\n  flex: 1;\r\n  min-width: 0;\r\n}\r\n\r\n.event-name {\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-primary);\r\n  margin: 0 0 6px 0;\r\n}\r\n\r\n.event-badge {\r\n  display: inline-block;\r\n  padding: 4px 12px;\r\n  border-radius: 12px;\r\n  font: var(--ag-typo-label);\r\n  font-weight: 600;\r\n}\r\n\r\n.event-badge.registered {\r\n  background: var(--ag-tag-green-bg);\r\n  color: var(--ag-color-support-success);\r\n}\r\n\r\n.event-badge.spots-left {\r\n  background: var(--ag-color-support-caution-major);\r\n  color: var(--ag-color-support-caution-major);\r\n}\r\n\r\n.event-badge.available {\r\n  background: var(--ag-tag-blue-bg);\r\n  color: var(--ag-color-support-info);\r\n}\r\n\r\n.event-date {\r\n  font: var(--ag-typo-helper-text);\r\n  color: var(--ag-color-text-secondary);\r\n  white-space: nowrap;\r\n}\r\n\r\n/* Rewards Card */\r\n.rewards-card {\r\n  background: linear-gradient(135deg, var(--ag-color-field-01) 0%, var(--ag-color-field-01) 100%);\r\n}\r\n\r\n.rewards-content {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  text-align: center;\r\n  padding: 32px 24px;\r\n}\r\n\r\n.rewards-title {\r\n  font: var(--ag-typo-h4);\r\n  font-weight: 600;\r\n  color: var(--ag-color-text-primary);\r\n  margin: 0 0 24px 0;\r\n}\r\n\r\n.rewards-illustration {\r\n  margin-bottom: 24px;\r\n  opacity: 0.9;\r\n}\r\n\r\n.btn-primary {\r\n  padding: 12px 32px;\r\n  background: var(--ag-button-primary);\r\n  color: var(--ag-color-layer-01);\r\n  border: none;\r\n  border-radius: 6px;\r\n  font: var(--ag-typo-body-02);\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n  display: inline-flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n}\r\n\r\n.btn-primary:hover {\r\n  background: var(--ag-button-primary-hover);\r\n  transform: translateY(-1px);\r\n  box-shadow: 0 4px 12px rgba(44, 95, 63, 0.3);\r\n}\r\n\r\n/* Redemption Status */\r\n.redemption-status-grid {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 20px;\r\n}\r\n\r\n.status-item {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 16px;\r\n}\r\n\r\n.status-icon {\r\n  width: 48px;\r\n  height: 48px;\r\n  border-radius: 10px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: center;\r\n  flex-shrink: 0;\r\n}\r\n\r\n.status-icon svg {\r\n  width: 28px;\r\n  height: 28px;\r\n}\r\n\r\n.status-icon.pending {\r\n  background: var(--ag-color-support-caution-major);\r\n  color: var(--ag-color-support-caution-major);\r\n}\r\n\r\n.status-icon.approved {\r\n  background: var(--ag-tag-green-bg);\r\n  color: var(--ag-color-support-success);\r\n}\r\n\r\n.status-icon.delivered {\r\n  background: var(--ag-tag-blue-bg);\r\n  color: var(--ag-color-support-info);\r\n}\r\n\r\n.status-info {\r\n  flex: 1;\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n\r\n.status-label {\r\n  font: var(--ag-typo-helper-text);\r\n  color: var(--ag-color-text-secondary);\r\n  font-weight: 500;\r\n  margin-bottom: 4px;\r\n}\r\n\r\n.status-count {\r\n  font: var(--ag-typo-h3);\r\n  font-weight: 700;\r\n  color: var(--ag-color-text-primary);\r\n  line-height: 1;\r\n}\r\n\r\n.status-unit {\r\n  font: var(--ag-typo-label);\r\n  color: var(--ag-color-text-placeholder);\r\n  margin-top: 2px;\r\n}\r\n\r\n/* Empty State */\r\n.empty-state {\r\n  text-align: center;\r\n  color: var(--ag-color-text-placeholder);\r\n  font: var(--ag-typo-body-02);\r\n  padding: 40px 20px;\r\n  margin: 0;\r\n}\r\n\r\n/* Responsive Design */\r\n@media (max-width: 1024px) {\r\n  .stats-grid {\r\n    grid-template-columns: repeat(2, 1fr);\r\n  }\r\n\r\n  .dashboard-grid,\r\n  .dashboard-grid-bottom {\r\n    grid-template-columns: 1fr;\r\n  }\r\n}\r\n\r\n@media (max-width: 768px) {\r\n  .dashboard-content {\r\n    padding: 20px;\r\n  }\r\n\r\n  .page-title {\r\n    font: var(--ag-typo-h3);\r\n    margin-bottom: 24px;\r\n  }\r\n\r\n  .stats-grid {\r\n    grid-template-columns: 1fr;\r\n    gap: 16px;\r\n  }\r\n\r\n  .dashboard-header {\r\n    padding: 16px 20px;\r\n    flex-direction: column;\r\n    align-items: stretch;\r\n  }\r\n\r\n  .search-container {\r\n    min-width: unset;\r\n  }\r\n\r\n  .header-right {\r\n    justify-content: space-between;\r\n  }\r\n}\r\n"] }]
    }], () => [{ type: i1.AuthService }, { type: i2.UserDashboardService }, { type: i3.Router }, { type: i0.ChangeDetectorRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(UserDashboardComponent, { className: "UserDashboardComponent", filePath: "src/app/pages/user/user-dashboard/user-dashboard.component.ts", lineNumber: 18 }); })();
//# sourceMappingURL=user-dashboard.component.js.map