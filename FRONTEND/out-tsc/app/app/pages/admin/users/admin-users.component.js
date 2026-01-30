import { Component, ViewChild, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, finalize } from 'rxjs/operators';
// ECharts imports
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { AdminSidebarComponent } from '../../../components/admin-sidebar/admin-sidebar.component';
import { UserTableComponent } from './components/user-table.component';
import { UserDetailDrawerComponent } from './components/user-detail-drawer.component';
import { AddUserModalComponent } from './components/add-user-modal-v2.component';
import { UserDeactivateConfirmationDialogComponent } from './components/user-deactivate-confirmation-dialog.component';
import * as i0 from "@angular/core";
import * as i1 from "../../../services/admin-users.service";
import * as i2 from "../../../services/auth.service";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
function AdminUsersComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 16)(1, "span", 17);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span", 18);
    i0.ɵɵelement(4, "i", 19);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", ctx_r1.currentUser == null ? null : ctx_r1.currentUser.firstName, " ", ctx_r1.currentUser == null ? null : ctx_r1.currentUser.lastName);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", (ctx_r1.currentUser == null ? null : ctx_r1.currentUser.roles == null ? null : ctx_r1.currentUser.roles[0]) || "Admin", " ");
} }
function AdminUsersComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 20);
    i0.ɵɵelement(1, "i", 21);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 22);
    i0.ɵɵlistener("click", function AdminUsersComponent_div_10_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.successMessage = null); });
    i0.ɵɵelement(5, "i", 23);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.successMessage);
} }
function AdminUsersComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 24);
    i0.ɵɵelement(1, "i", 25);
    i0.ɵɵelementStart(2, "span");
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "button", 22);
    i0.ɵɵlistener("click", function AdminUsersComponent_div_11_Template_button_click_4_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.error = null); });
    i0.ɵɵelement(5, "i", 23);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.error);
} }
function AdminUsersComponent_div_12_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 26);
    i0.ɵɵelement(1, "div", 27);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "Loading users...");
    i0.ɵɵelementEnd()();
} }
function AdminUsersComponent_ng_container_13_div_10_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 52);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("options", ctx_r1.chartOption);
} }
function AdminUsersComponent_ng_container_13_div_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 53);
    i0.ɵɵelement(1, "i", 54);
    i0.ɵɵelementStart(2, "p");
    i0.ɵɵtext(3, "No user data available");
    i0.ɵɵelementEnd()();
} }
function AdminUsersComponent_ng_container_13_div_25_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 55)(1, "div", 56)(2, "div", 57)(3, "label");
    i0.ɵɵtext(4, "Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "select", 58);
    i0.ɵɵtwoWayListener("ngModelChange", function AdminUsersComponent_ng_container_13_div_25_Template_select_ngModelChange_5_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.statusFilter, $event) || (ctx_r1.statusFilter = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("change", function AdminUsersComponent_ng_container_13_div_25_Template_select_change_5_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.applyFilters()); });
    i0.ɵɵelementStart(6, "option", 59);
    i0.ɵɵtext(7, "All Status");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "option", 60);
    i0.ɵɵtext(9, "Active");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "option", 61);
    i0.ɵɵtext(11, "Inactive");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(12, "div", 57)(13, "label");
    i0.ɵɵtext(14, "Role");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "select", 58);
    i0.ɵɵtwoWayListener("ngModelChange", function AdminUsersComponent_ng_container_13_div_25_Template_select_ngModelChange_15_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.roleFilter, $event) || (ctx_r1.roleFilter = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("change", function AdminUsersComponent_ng_container_13_div_25_Template_select_change_15_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.applyFilters()); });
    i0.ɵɵelementStart(16, "option", 59);
    i0.ɵɵtext(17, "All Roles");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "option", 62);
    i0.ɵɵtext(19, "Admin");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(20, "option", 63);
    i0.ɵɵtext(21, "Employee");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(22, "div", 57)(23, "label");
    i0.ɵɵtext(24, "Balance Range");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(25, "select", 58);
    i0.ɵɵtwoWayListener("ngModelChange", function AdminUsersComponent_ng_container_13_div_25_Template_select_ngModelChange_25_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.balanceFilter, $event) || (ctx_r1.balanceFilter = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("change", function AdminUsersComponent_ng_container_13_div_25_Template_select_change_25_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.applyFilters()); });
    i0.ɵɵelementStart(26, "option", 59);
    i0.ɵɵtext(27, "All Balances");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(28, "option", 64);
    i0.ɵɵtext(29, "0 - 1,000");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "option", 65);
    i0.ɵɵtext(31, "1,000 - 5,000");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(32, "option", 66);
    i0.ɵɵtext(33, "5,000+");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(34, "div", 57)(35, "label");
    i0.ɵɵtext(36, "Sort By");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(37, "select", 58);
    i0.ɵɵtwoWayListener("ngModelChange", function AdminUsersComponent_ng_container_13_div_25_Template_select_ngModelChange_37_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.sortField, $event) || (ctx_r1.sortField = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("change", function AdminUsersComponent_ng_container_13_div_25_Template_select_change_37_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.applyFilters()); });
    i0.ɵɵelementStart(38, "option", 67);
    i0.ɵɵtext(39, "Name");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "option", 68);
    i0.ɵɵtext(41, "Email");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(42, "option", 69);
    i0.ɵɵtext(43, "Balance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(44, "option", 70);
    i0.ɵɵtext(45, "Created Date");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(46, "div", 57)(47, "label");
    i0.ɵɵtext(48, "Order");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(49, "select", 58);
    i0.ɵɵtwoWayListener("ngModelChange", function AdminUsersComponent_ng_container_13_div_25_Template_select_ngModelChange_49_listener($event) { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(2); i0.ɵɵtwoWayBindingSet(ctx_r1.sortDirection, $event) || (ctx_r1.sortDirection = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("change", function AdminUsersComponent_ng_container_13_div_25_Template_select_change_49_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.applyFilters()); });
    i0.ɵɵelementStart(50, "option", 71);
    i0.ɵɵtext(51, "Ascending");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(52, "option", 72);
    i0.ɵɵtext(53, "Descending");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(54, "div", 73)(55, "button", 74);
    i0.ɵɵlistener("click", function AdminUsersComponent_ng_container_13_div_25_Template_button_click_55_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.resetFilters()); });
    i0.ɵɵelement(56, "i", 75);
    i0.ɵɵtext(57, " Reset ");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(5);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.statusFilter);
    i0.ɵɵadvance(10);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.roleFilter);
    i0.ɵɵadvance(10);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.balanceFilter);
    i0.ɵɵadvance(12);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.sortField);
    i0.ɵɵadvance(12);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.sortDirection);
} }
function AdminUsersComponent_ng_container_13_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "section", 28)(2, "div", 29)(3, "div", 30)(4, "div", 31)(5, "h2", 32);
    i0.ɵɵtext(6, "Top 5 Users by Current Balance");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "p", 33);
    i0.ɵɵtext(8, "Users with the highest current points balance");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(9, "div", 34);
    i0.ɵɵtemplate(10, AdminUsersComponent_ng_container_13_div_10_Template, 1, 1, "div", 35)(11, AdminUsersComponent_ng_container_13_div_11_Template, 4, 0, "div", 36);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(12, "section", 37)(13, "div", 38)(14, "div", 39)(15, "div", 40);
    i0.ɵɵelement(16, "i", 41);
    i0.ɵɵelementStart(17, "input", 42);
    i0.ɵɵtwoWayListener("ngModelChange", function AdminUsersComponent_ng_container_13_Template_input_ngModelChange_17_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); i0.ɵɵtwoWayBindingSet(ctx_r1.searchQuery, $event) || (ctx_r1.searchQuery = $event); return i0.ɵɵresetView($event); });
    i0.ɵɵlistener("input", function AdminUsersComponent_ng_container_13_Template_input_input_17_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onSearchInput()); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(18, "button", 43);
    i0.ɵɵlistener("click", function AdminUsersComponent_ng_container_13_Template_button_click_18_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.openAddUserModal()); });
    i0.ɵɵelement(19, "i", 44);
    i0.ɵɵtext(20, " Add User ");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "button", 45);
    i0.ɵɵlistener("click", function AdminUsersComponent_ng_container_13_Template_button_click_21_listener() { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.toggleFilters()); });
    i0.ɵɵelement(22, "i", 46);
    i0.ɵɵtext(23, " Filters ");
    i0.ɵɵelement(24, "i", 47);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(25, AdminUsersComponent_ng_container_13_div_25_Template, 58, 5, "div", 48);
    i0.ɵɵelementStart(26, "div", 49)(27, "span");
    i0.ɵɵtext(28);
    i0.ɵɵelementEnd()()()();
    i0.ɵɵelementStart(29, "section", 50)(30, "app-user-table", 51);
    i0.ɵɵlistener("actionTriggered", function AdminUsersComponent_ng_container_13_Template_app_user_table_actionTriggered_30_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onTableAction($event)); })("pageChanged", function AdminUsersComponent_ng_container_13_Template_app_user_table_pageChanged_30_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onPageChanged($event)); })("rowClicked", function AdminUsersComponent_ng_container_13_Template_app_user_table_rowClicked_30_listener($event) { i0.ɵɵrestoreView(_r5); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onRowClicked($event)); });
    i0.ɵɵelementEnd()();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(10);
    i0.ɵɵproperty("ngIf", ctx_r1.topUsers().length > 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.topUsers().length === 0);
    i0.ɵɵadvance(6);
    i0.ɵɵtwoWayProperty("ngModel", ctx_r1.searchQuery);
    i0.ɵɵadvance(4);
    i0.ɵɵclassProp("active", ctx_r1.showFilters);
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("rotated", ctx_r1.showFilters);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.showFilters);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate2("", ctx_r1.filteredUsers().length, " user", ctx_r1.filteredUsers().length !== 1 ? "s" : "", " found");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("users", ctx_r1.paginatedUsers)("isLoading", ctx_r1.isLoading)("currentPage", ctx_r1.currentPage)("pageSize", ctx_r1.pageSize)("totalItems", ctx_r1.totalItems);
} }
function AdminUsersComponent_app_user_deactivate_confirmation_dialog_17_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-user-deactivate-confirmation-dialog", 76);
    i0.ɵɵlistener("confirm", function AdminUsersComponent_app_user_deactivate_confirmation_dialog_17_Template_app_user_deactivate_confirmation_dialog_confirm_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onDeactivateConfirmed()); })("cancel", function AdminUsersComponent_app_user_deactivate_confirmation_dialog_17_Template_app_user_deactivate_confirmation_dialog_cancel_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onDeactivateCancelled()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("data", ctx_r1.deactivateWarningData);
} }
// Register ECharts components
echarts.use([BarChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent, CanvasRenderer]);
export class AdminUsersComponent {
    get totalItems() {
        return this.filteredUsers().length;
    }
    constructor(adminUsersService, authService, cdr) {
        this.adminUsersService = adminUsersService;
        this.authService = authService;
        this.cdr = cdr;
        // Users data - using signals for reactivity
        this.usersSignal = signal([], ...(ngDevMode ? [{ debugName: "usersSignal" }] : []));
        this.searchQuerySignal = signal('', ...(ngDevMode ? [{ debugName: "searchQuerySignal" }] : []));
        this.filtersSignal = signal({}, ...(ngDevMode ? [{ debugName: "filtersSignal" }] : []));
        this.sortSignal = signal({ field: 'name', direction: 'asc' }, ...(ngDevMode ? [{ debugName: "sortSignal" }] : []));
        // Computed filtered and sorted users
        this.filteredUsers = computed(() => {
            let filtered = [...this.usersSignal()];
            const query = this.searchQuerySignal().toLowerCase();
            const filters = this.filtersSignal();
            const sort = this.sortSignal();
            // Apply search filter
            if (query) {
                filtered = filtered.filter(user => user.firstName.toLowerCase().includes(query) ||
                    user.lastName.toLowerCase().includes(query) ||
                    user.email.toLowerCase().includes(query) ||
                    user.employeeId.toLowerCase().includes(query));
            }
            // Apply status filter
            if (filters.status) {
                filtered = filtered.filter(user => (filters.status === 'active' && user.isActive) ||
                    (filters.status === 'inactive' && !user.isActive));
            }
            // Apply role filter
            if (filters.role) {
                filtered = filtered.filter(user => user.roles?.includes(filters.role));
            }
            // Apply balance range filter (fixed)
            if (filters.balanceRange) {
                filtered = filtered.filter(user => {
                    const balance = user.points?.current ?? 0;
                    switch (filters.balanceRange) {
                        case '0-1000':
                            return balance >= 0 && balance <= 1000;
                        case '1000-5000':
                            return balance > 1000 && balance <= 5000;
                        case '5000+':
                            return balance > 5000;
                        default:
                            return true;
                    }
                });
            }
            // Apply sorting
            filtered.sort((a, b) => {
                let comparison = 0;
                switch (sort.field) {
                    case 'name':
                        comparison = `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
                        break;
                    case 'email':
                        comparison = a.email.localeCompare(b.email);
                        break;
                    case 'balance':
                        comparison = (a.points?.current ?? 0) - (b.points?.current ?? 0);
                        break;
                    case 'createdAt':
                        // If createdAt exists, use it; otherwise fall back to id
                        comparison = (a.id || '').localeCompare(b.id || '');
                        break;
                }
                return sort.direction === 'asc' ? comparison : -comparison;
            });
            return filtered;
        }, ...(ngDevMode ? [{ debugName: "filteredUsers" }] : []));
        // Top 5 users for chart
        this.topUsers = computed(() => {
            const users = [...this.usersSignal()];
            return users
                .sort((a, b) => (b.points?.current ?? 0) - (a.points?.current ?? 0))
                .slice(0, 5)
                .map(u => ({
                name: `${u.firstName} ${u.lastName}`,
                balance: u.points?.current ?? 0
            }));
        }, ...(ngDevMode ? [{ debugName: "topUsers" }] : []));
        // Pagination
        this.currentPage = 1;
        this.pageSize = 10;
        // UI States
        this.isLoading = false;
        this.error = null;
        this.successMessage = null;
        // Filters state
        this.searchQuery = '';
        this.statusFilter = '';
        this.roleFilter = '';
        this.balanceFilter = '';
        this.sortField = 'name';
        this.sortDirection = 'asc';
        this.showFilters = false;
        // Modal and Drawer states
        this.isAddUserModalOpen = false;
        this.isDrawerOpen = false;
        this.selectedUserId = null;
        // User Deactivation Dialog states
        this.showDeactivateDialog = false;
        this.deactivateWarningData = null;
        this.pendingDeactivationUserId = null;
        this.deactivationBlockedMessage = null;
        // Chart options
        this.chartOption = {};
        this.destroy$ = new Subject();
        this.searchSubject = new Subject();
        // Debounce search
        this.searchSubject.pipe(debounceTime(300), takeUntil(this.destroy$)).subscribe(query => {
            this.searchQuerySignal.set(query);
            this.currentPage = 1;
            this.cdr.markForCheck();
        });
    }
    ngOnInit() {
        // Get current user
        this.authService.currentUser$
            .pipe(takeUntil(this.destroy$))
            .subscribe(user => {
            this.currentUser = user;
            this.cdr.markForCheck();
        });
        this.loadUsers();
    }
    /**
     * Load all users from API
     */
    loadUsers() {
        this.isLoading = true;
        this.error = null;
        this.adminUsersService.getAllUsers(false).pipe(takeUntil(this.destroy$), finalize(() => {
            this.isLoading = false;
            this.cdr.markForCheck();
        })).subscribe({
            next: (response) => {
                this.usersSignal.set(response.users || []);
                this.updateChart();
                this.cdr.markForCheck();
            },
            error: (err) => {
                this.error = err.message || 'Failed to load users';
                console.error('Failed to load users:', err);
                this.cdr.markForCheck();
            }
        });
    }
    /**
     * Update chart with top 5 users
     */
    updateChart() {
        const top5 = this.topUsers();
        if (top5.length === 0) {
            this.chartOption = {};
            return;
        }
        // Reverse for horizontal bar (top user at top)
        const reversedUsers = [...top5].reverse();
        this.chartOption = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' },
                formatter: (params) => {
                    const data = params[0];
                    return `${data.name}<br/>Balance: ${data.value.toLocaleString()} pts`;
                }
            },
            legend: {
                show: false
            },
            grid: {
                left: '3%',
                right: '8%',
                bottom: '3%',
                top: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                axisLabel: {
                    formatter: (value) => value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value.toString()
                },
                splitLine: {
                    lineStyle: { color: '#f0f0f0' }
                }
            },
            yAxis: {
                type: 'category',
                data: reversedUsers.map(u => u.name),
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: {
                    color: '#374151',
                    fontSize: 12
                }
            },
            series: [
                {
                    name: 'Balance',
                    type: 'bar',
                    data: reversedUsers.map(u => u.balance),
                    itemStyle: {
                        color: '#2c5f3f',
                        borderRadius: [0, 4, 4, 0]
                    },
                    barWidth: '60%',
                    label: {
                        show: true,
                        position: 'right',
                        formatter: (params) => params.value.toLocaleString(),
                        color: '#6b7280',
                        fontSize: 11
                    }
                }
            ]
        };
    }
    /**
     * Handle search input
     */
    onSearchInput() {
        this.searchSubject.next(this.searchQuery);
    }
    /**
     * Apply filters
     */
    applyFilters() {
        this.filtersSignal.set({
            status: (this.statusFilter || undefined),
            role: this.roleFilter || undefined,
            balanceRange: (this.balanceFilter || undefined)
        });
        this.sortSignal.set({
            field: this.sortField,
            direction: this.sortDirection
        });
        this.currentPage = 1;
        this.cdr.markForCheck();
    }
    /**
     * Reset filters
     */
    resetFilters() {
        this.searchQuery = '';
        this.statusFilter = '';
        this.roleFilter = '';
        this.balanceFilter = '';
        this.sortField = 'name';
        this.sortDirection = 'asc';
        this.searchQuerySignal.set('');
        this.filtersSignal.set({});
        this.sortSignal.set({ field: 'name', direction: 'asc' });
        this.currentPage = 1;
        this.cdr.markForCheck();
    }
    /**
     * Toggle filters panel
     */
    toggleFilters() {
        this.showFilters = !this.showFilters;
    }
    /**
     * Handle pagination
     */
    onPageChanged(page) {
        this.currentPage = page;
        this.cdr.markForCheck();
    }
    /**
     * Get paginated users for display
     */
    get paginatedUsers() {
        const filtered = this.filteredUsers();
        const startIndex = (this.currentPage - 1) * this.pageSize;
        return filtered.slice(startIndex, startIndex + this.pageSize);
    }
    /**
     * Handle row single-click to open drawer
     */
    onRowClicked(user) {
        this.openDrawer(user.id);
    }
    /**
     * Handle table actions
     */
    onTableAction(action) {
        switch (action.type) {
            case 'view':
                this.openDrawer(action.userId);
                break;
            case 'edit':
                this.openDrawerForEdit(action.userId);
                break;
            case 'transactions':
                this.openDrawerForTransactions(action.userId);
                break;
            case 'reset-password':
                this.resetUserPassword(action.userId);
                break;
            case 'toggle-status':
                this.toggleUserStatus(action.user);
                break;
            case 'delete':
                this.deleteUser(action.userId);
                break;
        }
    }
    /**
     * Open user detail drawer
     */
    openDrawer(userId) {
        this.selectedUserId = userId;
        this.isDrawerOpen = true;
        this.cdr.markForCheck();
    }
    /**
     * Open drawer in edit mode
     */
    openDrawerForEdit(userId) {
        this.selectedUserId = userId;
        this.isDrawerOpen = true;
        setTimeout(() => {
            if (this.drawerComponent) {
                this.drawerComponent.enterEditMode();
            }
        }, 100);
        this.cdr.markForCheck();
    }
    /**
     * Open drawer on transaction tab
     */
    openDrawerForTransactions(userId) {
        this.selectedUserId = userId;
        this.isDrawerOpen = true;
        setTimeout(() => {
            if (this.drawerComponent) {
                this.drawerComponent.activeTab = 'activity';
            }
        }, 100);
        this.cdr.markForCheck();
    }
    /**
     * Close drawer
     */
    closeDrawer() {
        this.isDrawerOpen = false;
        this.selectedUserId = null;
        this.cdr.markForCheck();
    }
    /**
     * Handle drawer actions
     */
    onDrawerAction(action) {
        switch (action.type) {
            case 'deactivate':
                if (this.selectedUserId) {
                    this.deactivateUser(this.selectedUserId);
                }
                break;
            case 'user-updated':
                this.loadUsers();
                this.showSuccess('User updated successfully!');
                break;
        }
    }
    /**
     * Open add user modal
     */
    openAddUserModal() {
        this.isAddUserModalOpen = true;
        this.cdr.markForCheck();
    }
    /**
     * Close add user modal
     */
    closeAddUserModal() {
        this.isAddUserModalOpen = false;
        if (this.addUserModalComponent) {
            this.addUserModalComponent.closeModal();
        }
        this.cdr.markForCheck();
    }
    /**
     * Handle user creation
     */
    onUserCreated(request) {
        this.adminUsersService.createUser(request).pipe(takeUntil(this.destroy$), finalize(() => {
            if (this.addUserModalComponent) {
                this.addUserModalComponent.setSubmitting(false);
            }
        })).subscribe({
            next: () => {
                this.showSuccess('User created successfully!');
                this.closeAddUserModal();
                this.loadUsers();
            },
            error: (err) => {
                const errorMessage = err.message || 'Failed to create user';
                if (this.addUserModalComponent) {
                    this.addUserModalComponent.setError(errorMessage);
                }
                console.error('Create user error:', err);
            }
        });
    }
    /**
     * Show success message
     */
    showSuccess(message) {
        this.successMessage = message;
        this.cdr.markForCheck();
        setTimeout(() => {
            this.successMessage = null;
            this.cdr.markForCheck();
        }, 3000);
    }
    /**
     * Show error message
     */
    showError(message) {
        this.error = message;
        this.cdr.markForCheck();
        setTimeout(() => {
            this.error = null;
            this.cdr.markForCheck();
        }, 5000);
    }
    /**
     * Reset user password
     */
    resetUserPassword(userId) {
        if (confirm('Send password reset email to this user?')) {
            console.log('Resetting password for user:', userId);
            this.showSuccess('Password reset email sent!');
        }
    }
    /**
     * Toggle user status
     * For deactivation: initiates the business rule validation flow
     * For activation: simple toggle
     */
    toggleUserStatus(user) {
        if (user.isActive) {
            // Deactivating - use the business rule flow
            this.deactivateUser(user.id);
        }
        else {
            // Activating - simple confirm and activate
            if (confirm(`Are you sure you want to activate this user?`)) {
                this.adminUsersService.activateUser(user.id).pipe(takeUntil(this.destroy$)).subscribe({
                    next: () => {
                        this.showSuccess('User activated successfully!');
                        this.loadUsers();
                        if (this.isDrawerOpen) {
                            this.closeDrawer();
                        }
                    },
                    error: () => {
                        this.showError('Failed to activate user');
                    }
                });
            }
        }
    }
    /**
     * Deactivate user with business rule handling
     * Handles hard blocks (422) and soft warnings (409)
     */
    deactivateUser(userId) {
        this.deactivationBlockedMessage = null;
        const user = this.usersSignal().find(u => u.id === userId);
        if (!user)
            return;
        // First attempt without force - let server check for warnings/blocks
        this.isLoading = true;
        this.cdr.markForCheck();
        this.adminUsersService.deactivateUser(userId, false).pipe(takeUntil(this.destroy$)).subscribe({
            next: (response) => {
                console.log('User deactivated successfully:', response);
                this.isLoading = false;
                this.showSuccess(`User "${user.firstName} ${user.lastName}" deactivated successfully!`);
                this.closeDrawer();
                this.loadUsers();
            },
            error: (error) => {
                console.error('Error deactivating user:', error);
                this.isLoading = false;
                this.cdr.markForCheck();
                // Check if it's a soft warning (409 Conflict)
                if (this.adminUsersService.isDeactivationWarning(error)) {
                    const warnings = error.error;
                    this.pendingDeactivationUserId = userId;
                    this.deactivateWarningData = {
                        userName: `${user.firstName} ${user.lastName}`,
                        userId: userId,
                        pointsBalance: warnings.pointsBalance,
                        completedEventsCount: warnings.completedEventsCount,
                        completedRedemptionsCount: warnings.completedRedemptionsCount,
                        lastActivityDate: warnings.lastActivityDate,
                        daysSinceLastActivity: warnings.daysSinceLastActivity
                    };
                    this.showDeactivateDialog = true;
                    this.cdr.markForCheck();
                    return;
                }
                // Check if it's a hard block (422 Unprocessable Entity)
                if (this.adminUsersService.isDeactivationBlocked(error)) {
                    const blocked = error.error;
                    // Show blocking reasons in error message
                    const reasons = blocked.reasons?.length > 0
                        ? blocked.reasons.join(' ')
                        : blocked.message;
                    this.deactivationBlockedMessage = reasons;
                    this.error = reasons;
                    setTimeout(() => {
                        this.error = null;
                        this.deactivationBlockedMessage = null;
                        this.cdr.markForCheck();
                    }, 8000);
                    this.cdr.markForCheck();
                    return;
                }
                // Generic error
                this.showError(error?.error?.message || 'Failed to deactivate user. Please try again.');
            }
        });
    }
    /**
     * Handle confirmation from deactivate warning dialog
     */
    onDeactivateConfirmed() {
        if (!this.pendingDeactivationUserId)
            return;
        const userId = this.pendingDeactivationUserId;
        const user = this.usersSignal().find(u => u.id === userId);
        this.showDeactivateDialog = false;
        this.deactivateWarningData = null;
        this.isLoading = true;
        this.cdr.markForCheck();
        // Retry with force=true to bypass soft warnings
        this.adminUsersService.deactivateUser(userId, true).pipe(takeUntil(this.destroy$)).subscribe({
            next: (response) => {
                console.log('User deactivated successfully (forced):', response);
                this.isLoading = false;
                this.pendingDeactivationUserId = null;
                this.showSuccess(`User "${user?.firstName} ${user?.lastName}" deactivated successfully!`);
                this.closeDrawer();
                this.loadUsers();
            },
            error: (error) => {
                console.error('Error deactivating user (forced):', error);
                this.isLoading = false;
                this.pendingDeactivationUserId = null;
                this.cdr.markForCheck();
                // Even with force, hard blocks cannot be bypassed
                if (this.adminUsersService.isDeactivationBlocked(error)) {
                    const blocked = error.error;
                    const reasons = blocked.reasons?.length > 0
                        ? blocked.reasons.join(' ')
                        : blocked.message;
                    this.error = reasons;
                }
                else {
                    this.error = error?.error?.message || 'Failed to deactivate user. Please try again.';
                }
                setTimeout(() => {
                    this.error = null;
                    this.cdr.markForCheck();
                }, 5000);
            }
        });
    }
    /**
     * Handle cancellation from deactivate warning dialog
     */
    onDeactivateCancelled() {
        this.showDeactivateDialog = false;
        this.deactivateWarningData = null;
        this.pendingDeactivationUserId = null;
        this.cdr.markForCheck();
    }
    /**
     * Delete user
     */
    deleteUser(userId) {
        if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            this.adminUsersService.deleteUser(userId).pipe(takeUntil(this.destroy$)).subscribe({
                next: () => {
                    this.showSuccess('User deleted successfully!');
                    this.loadUsers();
                },
                error: () => {
                    this.showError('Failed to delete user');
                }
            });
        }
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    static { this.ɵfac = function AdminUsersComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AdminUsersComponent)(i0.ɵɵdirectiveInject(i1.AdminUsersService), i0.ɵɵdirectiveInject(i2.AuthService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AdminUsersComponent, selectors: [["app-admin-users"]], viewQuery: function AdminUsersComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(UserDetailDrawerComponent, 5)(AddUserModalComponent, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.drawerComponent = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.addUserModalComponent = _t.first);
        } }, features: [i0.ɵɵProvidersFeature([
                provideEchartsCore({ echarts })
            ])], decls: 18, vars: 9, consts: [["userDrawer", ""], [1, "admin-users-wrapper"], [1, "admin-users-main"], [1, "page-header"], [1, "header-left"], [1, "page-title"], [1, "header-right"], ["class", "user-info", 4, "ngIf"], [1, "main-content"], ["class", "success-alert", "role", "alert", 4, "ngIf"], ["class", "error-alert", "role", "alert", 4, "ngIf"], ["class", "loading-container", 4, "ngIf"], [4, "ngIf"], [3, "closed", "actionTriggered", "isOpen", "userId"], [3, "closed", "userCreated", "isOpen"], [3, "data", "confirm", "cancel", 4, "ngIf"], [1, "user-info"], [1, "user-name"], [1, "user-role"], [1, "fa-solid", "fa-shield-halved"], ["role", "alert", 1, "success-alert"], [1, "fa-solid", "fa-circle-check"], ["aria-label", "Dismiss", 1, "alert-dismiss", 3, "click"], [1, "fa-solid", "fa-xmark"], ["role", "alert", 1, "error-alert"], [1, "fa-solid", "fa-circle-exclamation"], [1, "loading-container"], [1, "loading-spinner"], ["aria-label", "Top Users by Balance", 1, "chart-section"], [1, "chart-card"], [1, "chart-header"], [1, "chart-title-group"], [1, "chart-title"], [1, "chart-subtitle"], [1, "chart-body"], ["echarts", "", "class", "balance-chart", "aria-label", "Horizontal bar chart showing top 5 users by balance", 3, "options", 4, "ngIf"], ["class", "chart-empty", 4, "ngIf"], [1, "controls-section"], [1, "controls-card"], [1, "controls-row"], [1, "search-group"], [1, "fa-solid", "fa-magnifying-glass", "search-icon"], ["type", "text", "placeholder", "Search users by name, email, or ID...", "aria-label", "Search users", 1, "search-input", 3, "ngModelChange", "input", "ngModel"], [1, "btn-primary", 3, "click"], [1, "fa-solid", "fa-plus"], [1, "btn-filter", 3, "click"], [1, "fa-solid", "fa-sliders"], [1, "fa-solid", "fa-chevron-down", "toggle-icon"], ["class", "filters-panel", 4, "ngIf"], [1, "results-summary"], [1, "table-section"], [3, "actionTriggered", "pageChanged", "rowClicked", "users", "isLoading", "currentPage", "pageSize", "totalItems"], ["echarts", "", "aria-label", "Horizontal bar chart showing top 5 users by balance", 1, "balance-chart", 3, "options"], [1, "chart-empty"], [1, "fa-regular", "fa-chart-bar"], [1, "filters-panel"], [1, "filters-grid"], [1, "filter-group"], [3, "ngModelChange", "change", "ngModel"], ["value", ""], ["value", "active"], ["value", "inactive"], ["value", "Admin"], ["value", "Employee"], ["value", "0-1000"], ["value", "1000-5000"], ["value", "5000+"], ["value", "name"], ["value", "email"], ["value", "balance"], ["value", "createdAt"], ["value", "asc"], ["value", "desc"], [1, "filter-group", "filter-actions"], [1, "btn-reset", 3, "click"], [1, "fa-solid", "fa-rotate-left"], [3, "confirm", "cancel", "data"]], template: function AdminUsersComponent_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "div", 1);
            i0.ɵɵelement(1, "app-admin-sidebar");
            i0.ɵɵelementStart(2, "div", 2)(3, "header", 3)(4, "div", 4)(5, "h1", 5);
            i0.ɵɵtext(6, "Users Management");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(7, "div", 6);
            i0.ɵɵtemplate(8, AdminUsersComponent_div_8_Template, 6, 3, "div", 7);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(9, "main", 8);
            i0.ɵɵtemplate(10, AdminUsersComponent_div_10_Template, 6, 1, "div", 9)(11, AdminUsersComponent_div_11_Template, 6, 1, "div", 10)(12, AdminUsersComponent_div_12_Template, 4, 0, "div", 11)(13, AdminUsersComponent_ng_container_13_Template, 31, 15, "ng-container", 12);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "app-user-detail-drawer", 13, 0);
            i0.ɵɵlistener("closed", function AdminUsersComponent_Template_app_user_detail_drawer_closed_14_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.closeDrawer()); })("actionTriggered", function AdminUsersComponent_Template_app_user_detail_drawer_actionTriggered_14_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onDrawerAction($event)); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(16, "app-add-user-modal", 14);
            i0.ɵɵlistener("closed", function AdminUsersComponent_Template_app_add_user_modal_closed_16_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.closeAddUserModal()); })("userCreated", function AdminUsersComponent_Template_app_add_user_modal_userCreated_16_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onUserCreated($event)); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(17, AdminUsersComponent_app_user_deactivate_confirmation_dialog_17_Template, 1, 1, "app-user-deactivate-confirmation-dialog", 15);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(8);
            i0.ɵɵproperty("ngIf", ctx.currentUser);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.successMessage);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.error);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.isLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", !ctx.isLoading);
            i0.ɵɵadvance();
            i0.ɵɵproperty("isOpen", ctx.isDrawerOpen)("userId", ctx.selectedUserId);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("isOpen", ctx.isAddUserModalOpen);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.showDeactivateDialog);
        } }, dependencies: [CommonModule, i3.NgIf, FormsModule, i4.NgSelectOption, i4.ɵNgSelectMultipleOption, i4.DefaultValueAccessor, i4.SelectControlValueAccessor, i4.NgControlStatus, i4.NgModel, AdminSidebarComponent,
            NgxEchartsDirective,
            UserTableComponent,
            UserDetailDrawerComponent,
            AddUserModalComponent,
            UserDeactivateConfirmationDialogComponent], styles: ["\n\r\n\n\r\n\r\n\r\n\r\n\n\r\n.admin-users-wrapper[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  min-height: 100vh;\r\n  background: #f8faf9;\r\n}\r\n\r\n.admin-users-main[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  display: flex;\r\n  flex-direction: column;\r\n  min-width: 0;\r\n  overflow: hidden;\r\n}\r\n\r\n\r\n\r\n\n\r\n.page-header[_ngcontent-%COMP%] {\r\n  background: #ffffff;\r\n  border-bottom: 1px solid #e5e7eb;\r\n  padding: 16px 32px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  flex-shrink: 0;\r\n}\r\n\r\n.header-left[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 16px;\r\n}\r\n\r\n.page-title[_ngcontent-%COMP%] {\r\n  font-size: 22px;\r\n  font-weight: 700;\r\n  color: #1f2937;\r\n  margin: 0;\r\n}\r\n\r\n.header-right[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 16px;\r\n}\r\n\r\n.user-info[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n}\r\n\r\n.user-name[_ngcontent-%COMP%] {\r\n  font-size: 14px;\r\n  font-weight: 500;\r\n  color: #374151;\r\n}\r\n\r\n.user-role[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 6px;\r\n  padding: 6px 12px;\r\n  background: rgba(44, 95, 63, 0.1);\r\n  color: #2c5f3f;\r\n  border-radius: 20px;\r\n  font-size: 12px;\r\n  font-weight: 600;\r\n}\r\n\r\n.user-role[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\r\n  font-size: 11px;\r\n}\r\n\r\n\r\n\r\n\n\r\n.main-content[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  overflow-y: auto;\r\n  padding: 24px 32px;\r\n}\r\n\r\n\r\n\r\n\n\r\n.success-alert[_ngcontent-%COMP%], \r\n.error-alert[_ngcontent-%COMP%] {\r\n  padding: 14px 16px;\r\n  margin-bottom: 20px;\r\n  border-radius: 8px;\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n  animation: _ngcontent-%COMP%_slideDown 0.3s ease;\r\n}\r\n\r\n@keyframes _ngcontent-%COMP%_slideDown {\r\n  from {\r\n    opacity: 0;\r\n    transform: translateY(-10px);\r\n  }\r\n  to {\r\n    opacity: 1;\r\n    transform: translateY(0);\r\n  }\r\n}\r\n\r\n.success-alert[_ngcontent-%COMP%] {\r\n  background: #ecfdf5;\r\n  border: 1px solid #a7f3d0;\r\n  color: #047857;\r\n}\r\n\r\n.error-alert[_ngcontent-%COMP%] {\r\n  background: #fef2f2;\r\n  border: 1px solid #fecaca;\r\n  color: #dc2626;\r\n}\r\n\r\n.success-alert[_ngcontent-%COMP%]   i[_ngcontent-%COMP%], \r\n.error-alert[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\r\n  font-size: 18px;\r\n  flex-shrink: 0;\r\n}\r\n\r\n.success-alert[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \r\n.error-alert[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  font-size: 14px;\r\n}\r\n\r\n.alert-dismiss[_ngcontent-%COMP%] {\r\n  background: none;\r\n  border: none;\r\n  padding: 4px;\r\n  cursor: pointer;\r\n  opacity: 0.7;\r\n  transition: opacity 0.2s;\r\n}\r\n\r\n.alert-dismiss[_ngcontent-%COMP%]:hover {\r\n  opacity: 1;\r\n}\r\n\r\n.success-alert[_ngcontent-%COMP%]   .alert-dismiss[_ngcontent-%COMP%] {\r\n  color: #047857;\r\n}\r\n\r\n.error-alert[_ngcontent-%COMP%]   .alert-dismiss[_ngcontent-%COMP%] {\r\n  color: #dc2626;\r\n}\r\n\r\n\r\n\r\n\n\r\n.loading-container[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  padding: 80px 20px;\r\n  gap: 16px;\r\n}\r\n\r\n.loading-spinner[_ngcontent-%COMP%] {\r\n  width: 40px;\r\n  height: 40px;\r\n  border: 3px solid #e5e7eb;\r\n  border-top-color: #2c5f3f;\r\n  border-radius: 50%;\r\n  animation: _ngcontent-%COMP%_spin 0.8s linear infinite;\r\n}\r\n\r\n@keyframes _ngcontent-%COMP%_spin {\r\n  to { transform: rotate(360deg); }\r\n}\r\n\r\n.loading-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n  font-size: 14px;\r\n  color: #6b7280;\r\n  margin: 0;\r\n}\r\n\r\n\r\n\r\n\n\r\n.chart-section[_ngcontent-%COMP%] {\r\n  margin-bottom: 24px;\r\n}\r\n\r\n.chart-card[_ngcontent-%COMP%] {\r\n  background: #ffffff;\r\n  border-radius: 12px;\r\n  padding: 24px;\r\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\r\n  border: 1px solid #e5e7eb;\r\n}\r\n\r\n.chart-header[_ngcontent-%COMP%] {\r\n  margin-bottom: 20px;\r\n}\r\n\r\n.chart-title-group[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 4px;\r\n}\r\n\r\n.chart-title[_ngcontent-%COMP%] {\r\n  font-size: 16px;\r\n  font-weight: 600;\r\n  color: #1f2937;\r\n  margin: 0;\r\n}\r\n\r\n.chart-subtitle[_ngcontent-%COMP%] {\r\n  font-size: 13px;\r\n  color: #6b7280;\r\n  margin: 0;\r\n}\r\n\r\n.chart-body[_ngcontent-%COMP%] {\r\n  min-height: 200px;\r\n}\r\n\r\n.balance-chart[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  height: 200px;\r\n}\r\n\r\n.chart-empty[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  height: 200px;\r\n  color: #9ca3af;\r\n}\r\n\r\n.chart-empty[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\r\n  font-size: 40px;\r\n  margin-bottom: 12px;\r\n  opacity: 0.5;\r\n}\r\n\r\n.chart-empty[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\r\n  font-size: 14px;\r\n  margin: 0;\r\n}\r\n\r\n\r\n\r\n\n\r\n.controls-section[_ngcontent-%COMP%] {\r\n  margin-bottom: 24px;\r\n}\r\n\r\n.controls-card[_ngcontent-%COMP%] {\r\n  background: #ffffff;\r\n  border-radius: 12px;\r\n  padding: 20px 24px;\r\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\r\n  border: 1px solid #e5e7eb;\r\n}\r\n\r\n.controls-row[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.search-group[_ngcontent-%COMP%] {\r\n  flex: 1;\r\n  min-width: 280px;\r\n  position: relative;\r\n}\r\n\r\n.search-icon[_ngcontent-%COMP%] {\r\n  position: absolute;\r\n  left: 14px;\r\n  top: 50%;\r\n  transform: translateY(-50%);\r\n  color: #9ca3af;\r\n  font-size: 14px;\r\n  pointer-events: none;\r\n}\r\n\r\n.search-input[_ngcontent-%COMP%] {\r\n  width: 100%;\r\n  padding: 10px 14px 10px 40px;\r\n  border: 1px solid #e5e7eb;\r\n  border-radius: 8px;\r\n  font-size: 14px;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.search-input[_ngcontent-%COMP%]:focus {\r\n  outline: none;\r\n  border-color: #2c5f3f;\r\n  box-shadow: 0 0 0 3px rgba(44, 95, 63, 0.1);\r\n}\r\n\r\n.search-input[_ngcontent-%COMP%]::placeholder {\r\n  color: #9ca3af;\r\n}\r\n\r\n.btn-primary[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n  padding: 10px 18px;\r\n  background: #2c5f3f;\r\n  color: #ffffff;\r\n  border: none;\r\n  border-radius: 8px;\r\n  font-size: 14px;\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n  white-space: nowrap;\r\n}\r\n\r\n.btn-primary[_ngcontent-%COMP%]:hover {\r\n  background: #1e4620;\r\n  box-shadow: 0 4px 12px rgba(44, 95, 63, 0.2);\r\n}\r\n\r\n.btn-primary[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\r\n  font-size: 12px;\r\n}\r\n\r\n.btn-filter[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n  padding: 10px 16px;\r\n  background: #ffffff;\r\n  color: #374151;\r\n  border: 1px solid #e5e7eb;\r\n  border-radius: 8px;\r\n  font-size: 14px;\r\n  font-weight: 500;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.btn-filter[_ngcontent-%COMP%]:hover {\r\n  background: #f9fafb;\r\n  border-color: #d1d5db;\r\n}\r\n\r\n.btn-filter.active[_ngcontent-%COMP%] {\r\n  background: #f0fdf4;\r\n  border-color: #2c5f3f;\r\n  color: #2c5f3f;\r\n}\r\n\r\n.toggle-icon[_ngcontent-%COMP%] {\r\n  font-size: 10px;\r\n  transition: transform 0.2s;\r\n}\r\n\r\n.toggle-icon.rotated[_ngcontent-%COMP%] {\r\n  transform: rotate(180deg);\r\n}\r\n\r\n\n\r\n.filters-panel[_ngcontent-%COMP%] {\r\n  margin-top: 16px;\r\n  padding-top: 16px;\r\n  border-top: 1px solid #f3f4f6;\r\n  animation: _ngcontent-%COMP%_slideDown 0.2s ease;\r\n}\r\n\r\n.filters-grid[_ngcontent-%COMP%] {\r\n  display: grid;\r\n  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));\r\n  gap: 16px;\r\n  align-items: end;\r\n}\r\n\r\n.filter-group[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 6px;\r\n}\r\n\r\n.filter-group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\r\n  font-size: 12px;\r\n  font-weight: 600;\r\n  color: #6b7280;\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.5px;\r\n}\r\n\r\n.filter-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%] {\r\n  padding: 8px 12px;\r\n  border: 1px solid #e5e7eb;\r\n  border-radius: 6px;\r\n  font-size: 14px;\r\n  background-color: #ffffff;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.filter-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:hover {\r\n  border-color: #d1d5db;\r\n}\r\n\r\n.filter-group[_ngcontent-%COMP%]   select[_ngcontent-%COMP%]:focus {\r\n  outline: none;\r\n  border-color: #2c5f3f;\r\n  box-shadow: 0 0 0 3px rgba(44, 95, 63, 0.1);\r\n}\r\n\r\n.filter-actions[_ngcontent-%COMP%] {\r\n  justify-content: flex-end;\r\n}\r\n\r\n.btn-reset[_ngcontent-%COMP%] {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 6px;\r\n  padding: 8px 14px;\r\n  background: #ffffff;\r\n  color: #6b7280;\r\n  border: 1px solid #e5e7eb;\r\n  border-radius: 6px;\r\n  font-size: 13px;\r\n  font-weight: 500;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.btn-reset[_ngcontent-%COMP%]:hover {\r\n  background: #f9fafb;\r\n  color: #374151;\r\n  border-color: #d1d5db;\r\n}\r\n\r\n.btn-reset[_ngcontent-%COMP%]   i[_ngcontent-%COMP%] {\r\n  font-size: 12px;\r\n}\r\n\r\n\n\r\n.results-summary[_ngcontent-%COMP%] {\r\n  margin-top: 12px;\r\n  padding-top: 12px;\r\n  border-top: 1px solid #f3f4f6;\r\n  font-size: 13px;\r\n  color: #6b7280;\r\n}\r\n\r\n\r\n\r\n\n\r\n.table-section[_ngcontent-%COMP%] {\r\n  \n\r\n}\r\n\r\n\r\n\r\n\n\r\n@media (max-width: 1024px) {\r\n  .main-content[_ngcontent-%COMP%] {\r\n    padding: 20px;\r\n  }\r\n\r\n  .chart-card[_ngcontent-%COMP%], \r\n   .controls-card[_ngcontent-%COMP%] {\r\n    padding: 20px;\r\n  }\r\n\r\n  .filters-grid[_ngcontent-%COMP%] {\r\n    grid-template-columns: repeat(2, 1fr);\r\n  }\r\n}\r\n\r\n@media (max-width: 768px) {\r\n  .page-header[_ngcontent-%COMP%] {\r\n    padding: 14px 20px;\r\n    flex-wrap: wrap;\r\n    gap: 12px;\r\n  }\r\n\r\n  .page-title[_ngcontent-%COMP%] {\r\n    font-size: 18px;\r\n  }\r\n\r\n  .main-content[_ngcontent-%COMP%] {\r\n    padding: 16px;\r\n  }\r\n\r\n  .controls-row[_ngcontent-%COMP%] {\r\n    flex-direction: column;\r\n    align-items: stretch;\r\n  }\r\n\r\n  .search-group[_ngcontent-%COMP%] {\r\n    min-width: 100%;\r\n  }\r\n\r\n  .btn-primary[_ngcontent-%COMP%], \r\n   .btn-filter[_ngcontent-%COMP%] {\r\n    width: 100%;\r\n    justify-content: center;\r\n  }\r\n\r\n  .filters-grid[_ngcontent-%COMP%] {\r\n    grid-template-columns: 1fr;\r\n  }\r\n\r\n  .user-info[_ngcontent-%COMP%] {\r\n    display: none;\r\n  }\r\n\r\n  .balance-chart[_ngcontent-%COMP%] {\r\n    height: 180px;\r\n  }\r\n}\r\n\r\n\r\n\r\n\n\r\n.main-content[_ngcontent-%COMP%]::-webkit-scrollbar {\r\n  width: 8px;\r\n}\r\n\r\n.main-content[_ngcontent-%COMP%]::-webkit-scrollbar-track {\r\n  background: #f1f5f9;\r\n}\r\n\r\n.main-content[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\r\n  background: #cbd5e1;\r\n  border-radius: 4px;\r\n}\r\n\r\n.main-content[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\r\n  background: #94a3b8;\r\n}\r\n\r\n\r\n\r\n\n\r\n@media (prefers-reduced-motion: reduce) {\r\n  .loading-spinner[_ngcontent-%COMP%] {\r\n    animation: none;\r\n  }\r\n  \r\n  .toggle-icon[_ngcontent-%COMP%] {\r\n    transition: none;\r\n  }\r\n}"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AdminUsersComponent, [{
        type: Component,
        args: [{ selector: 'app-admin-users', standalone: true, imports: [
                    CommonModule,
                    FormsModule,
                    AdminSidebarComponent,
                    NgxEchartsDirective,
                    UserTableComponent,
                    UserDetailDrawerComponent,
                    AddUserModalComponent,
                    UserDeactivateConfirmationDialogComponent
                ], providers: [
                    provideEchartsCore({ echarts })
                ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"admin-users-wrapper\">\r\n  <app-admin-sidebar></app-admin-sidebar>\r\n\r\n  <div class=\"admin-users-main\">\r\n    <!-- Header - Matches Admin Dashboard -->\r\n    <header class=\"page-header\">\r\n      <div class=\"header-left\">\r\n        <h1 class=\"page-title\">Users Management</h1>\r\n      </div>\r\n      <div class=\"header-right\">\r\n        <div class=\"user-info\" *ngIf=\"currentUser\">\r\n          <span class=\"user-name\">{{ currentUser?.firstName }} {{ currentUser?.lastName }}</span>\r\n          <span class=\"user-role\">\r\n            <i class=\"fa-solid fa-shield-halved\"></i>\r\n            {{ currentUser?.roles?.[0] || 'Admin' }}\r\n          </span>\r\n        </div>\r\n      </div>\r\n    </header>\r\n\r\n    <!-- Main Content -->\r\n    <main class=\"main-content\">\r\n      <!-- Success Message -->\r\n      <div class=\"success-alert\" *ngIf=\"successMessage\" role=\"alert\">\r\n        <i class=\"fa-solid fa-circle-check\"></i>\r\n        <span>{{ successMessage }}</span>\r\n        <button class=\"alert-dismiss\" (click)=\"successMessage = null\" aria-label=\"Dismiss\">\r\n          <i class=\"fa-solid fa-xmark\"></i>\r\n        </button>\r\n      </div>\r\n\r\n      <!-- Error Message -->\r\n      <div class=\"error-alert\" *ngIf=\"error\" role=\"alert\">\r\n        <i class=\"fa-solid fa-circle-exclamation\"></i>\r\n        <span>{{ error }}</span>\r\n        <button class=\"alert-dismiss\" (click)=\"error = null\" aria-label=\"Dismiss\">\r\n          <i class=\"fa-solid fa-xmark\"></i>\r\n        </button>\r\n      </div>\r\n\r\n      <!-- Loading State -->\r\n      <div *ngIf=\"isLoading\" class=\"loading-container\">\r\n        <div class=\"loading-spinner\"></div>\r\n        <p>Loading users...</p>\r\n      </div>\r\n\r\n      <ng-container *ngIf=\"!isLoading\">\r\n        <!-- Top 5 Balances Chart Card -->\r\n        <section class=\"chart-section\" aria-label=\"Top Users by Balance\">\r\n          <div class=\"chart-card\">\r\n            <div class=\"chart-header\">\r\n              <div class=\"chart-title-group\">\r\n                <h2 class=\"chart-title\">Top 5 Users by Current Balance</h2>\r\n                <p class=\"chart-subtitle\">Users with the highest current points balance</p>\r\n              </div>\r\n            </div>\r\n            <div class=\"chart-body\">\r\n              <div \r\n                *ngIf=\"topUsers().length > 0\"\r\n                echarts \r\n                [options]=\"chartOption\" \r\n                class=\"balance-chart\"\r\n                aria-label=\"Horizontal bar chart showing top 5 users by balance\">\r\n              </div>\r\n              <div class=\"chart-empty\" *ngIf=\"topUsers().length === 0\">\r\n                <i class=\"fa-regular fa-chart-bar\"></i>\r\n                <p>No user data available</p>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </section>\r\n\r\n        <!-- Controls Card -->\r\n        <section class=\"controls-section\">\r\n          <div class=\"controls-card\">\r\n            <div class=\"controls-row\">\r\n              <!-- Search -->\r\n              <div class=\"search-group\">\r\n                <i class=\"fa-solid fa-magnifying-glass search-icon\"></i>\r\n                <input\r\n                  type=\"text\"\r\n                  class=\"search-input\"\r\n                  placeholder=\"Search users by name, email, or ID...\"\r\n                  [(ngModel)]=\"searchQuery\"\r\n                  (input)=\"onSearchInput()\"\r\n                  aria-label=\"Search users\"\r\n                />\r\n              </div>\r\n\r\n              <!-- Add User Button -->\r\n              <button class=\"btn-primary\" (click)=\"openAddUserModal()\">\r\n                <i class=\"fa-solid fa-plus\"></i>\r\n                Add User\r\n              </button>\r\n\r\n              <!-- Filters Toggle -->\r\n              <button class=\"btn-filter\" (click)=\"toggleFilters()\" [class.active]=\"showFilters\">\r\n                <i class=\"fa-solid fa-sliders\"></i>\r\n                Filters\r\n                <i class=\"fa-solid fa-chevron-down toggle-icon\" [class.rotated]=\"showFilters\"></i>\r\n              </button>\r\n            </div>\r\n\r\n            <!-- Expandable Filters Panel -->\r\n            <div class=\"filters-panel\" *ngIf=\"showFilters\">\r\n              <div class=\"filters-grid\">\r\n                <!-- Status Filter -->\r\n                <div class=\"filter-group\">\r\n                  <label>Status</label>\r\n                  <select [(ngModel)]=\"statusFilter\" (change)=\"applyFilters()\">\r\n                    <option value=\"\">All Status</option>\r\n                    <option value=\"active\">Active</option>\r\n                    <option value=\"inactive\">Inactive</option>\r\n                  </select>\r\n                </div>\r\n\r\n                <!-- Role Filter -->\r\n                <div class=\"filter-group\">\r\n                  <label>Role</label>\r\n                  <select [(ngModel)]=\"roleFilter\" (change)=\"applyFilters()\">\r\n                    <option value=\"\">All Roles</option>\r\n                    <option value=\"Admin\">Admin</option>\r\n                    <option value=\"Employee\">Employee</option>\r\n                  </select>\r\n                </div>\r\n\r\n                <!-- Balance Range Filter -->\r\n                <div class=\"filter-group\">\r\n                  <label>Balance Range</label>\r\n                  <select [(ngModel)]=\"balanceFilter\" (change)=\"applyFilters()\">\r\n                    <option value=\"\">All Balances</option>\r\n                    <option value=\"0-1000\">0 - 1,000</option>\r\n                    <option value=\"1000-5000\">1,000 - 5,000</option>\r\n                    <option value=\"5000+\">5,000+</option>\r\n                  </select>\r\n                </div>\r\n\r\n                <!-- Sort By -->\r\n                <div class=\"filter-group\">\r\n                  <label>Sort By</label>\r\n                  <select [(ngModel)]=\"sortField\" (change)=\"applyFilters()\">\r\n                    <option value=\"name\">Name</option>\r\n                    <option value=\"email\">Email</option>\r\n                    <option value=\"balance\">Balance</option>\r\n                    <option value=\"createdAt\">Created Date</option>\r\n                  </select>\r\n                </div>\r\n\r\n                <!-- Sort Direction -->\r\n                <div class=\"filter-group\">\r\n                  <label>Order</label>\r\n                  <select [(ngModel)]=\"sortDirection\" (change)=\"applyFilters()\">\r\n                    <option value=\"asc\">Ascending</option>\r\n                    <option value=\"desc\">Descending</option>\r\n                  </select>\r\n                </div>\r\n\r\n                <!-- Reset Button -->\r\n                <div class=\"filter-group filter-actions\">\r\n                  <button class=\"btn-reset\" (click)=\"resetFilters()\">\r\n                    <i class=\"fa-solid fa-rotate-left\"></i>\r\n                    Reset\r\n                  </button>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <!-- Results Summary -->\r\n            <div class=\"results-summary\">\r\n              <span>{{ filteredUsers().length }} user{{ filteredUsers().length !== 1 ? 's' : '' }} found</span>\r\n            </div>\r\n          </div>\r\n        </section>\r\n\r\n        <!-- Users Table -->\r\n        <section class=\"table-section\">\r\n          <app-user-table\r\n            [users]=\"paginatedUsers\"\r\n            [isLoading]=\"isLoading\"\r\n            [currentPage]=\"currentPage\"\r\n            [pageSize]=\"pageSize\"\r\n            [totalItems]=\"totalItems\"\r\n            (actionTriggered)=\"onTableAction($event)\"\r\n            (pageChanged)=\"onPageChanged($event)\"\r\n            (rowClicked)=\"onRowClicked($event)\"\r\n          ></app-user-table>\r\n        </section>\r\n      </ng-container>\r\n    </main>\r\n  </div>\r\n\r\n  <!-- User Detail Drawer -->\r\n  <app-user-detail-drawer\r\n    #userDrawer\r\n    [isOpen]=\"isDrawerOpen\"\r\n    [userId]=\"selectedUserId\"\r\n    (closed)=\"closeDrawer()\"\r\n    (actionTriggered)=\"onDrawerAction($event)\"\r\n  ></app-user-detail-drawer>\r\n\r\n  <!-- Add User Modal -->\r\n  <app-add-user-modal\r\n    [isOpen]=\"isAddUserModalOpen\"\r\n    (closed)=\"closeAddUserModal()\"\r\n    (userCreated)=\"onUserCreated($event)\"\r\n  ></app-add-user-modal>\r\n\r\n  <!-- User Deactivate Confirmation Dialog -->\r\n  <app-user-deactivate-confirmation-dialog\r\n    *ngIf=\"showDeactivateDialog\"\r\n    [data]=\"deactivateWarningData\"\r\n    (confirm)=\"onDeactivateConfirmed()\"\r\n    (cancel)=\"onDeactivateCancelled()\"\r\n  ></app-user-deactivate-confirmation-dialog>\r\n</div>\r\n", styles: ["/* Admin Users Management - Redesigned Layout */\r\n/* Matches Admin Dashboard header & structure */\r\n\r\n/* =================================\r\n   Layout Structure\r\n   ================================= */\r\n.admin-users-wrapper {\r\n  display: flex;\r\n  min-height: 100vh;\r\n  background: #f8faf9;\r\n}\r\n\r\n.admin-users-main {\r\n  flex: 1;\r\n  display: flex;\r\n  flex-direction: column;\r\n  min-width: 0;\r\n  overflow: hidden;\r\n}\r\n\r\n/* =================================\r\n   Header (Matches Dashboard)\r\n   ================================= */\r\n.page-header {\r\n  background: #ffffff;\r\n  border-bottom: 1px solid #e5e7eb;\r\n  padding: 16px 32px;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  flex-shrink: 0;\r\n}\r\n\r\n.header-left {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 16px;\r\n}\r\n\r\n.page-title {\r\n  font-size: 22px;\r\n  font-weight: 700;\r\n  color: #1f2937;\r\n  margin: 0;\r\n}\r\n\r\n.header-right {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 16px;\r\n}\r\n\r\n.user-info {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n}\r\n\r\n.user-name {\r\n  font-size: 14px;\r\n  font-weight: 500;\r\n  color: #374151;\r\n}\r\n\r\n.user-role {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 6px;\r\n  padding: 6px 12px;\r\n  background: rgba(44, 95, 63, 0.1);\r\n  color: #2c5f3f;\r\n  border-radius: 20px;\r\n  font-size: 12px;\r\n  font-weight: 600;\r\n}\r\n\r\n.user-role i {\r\n  font-size: 11px;\r\n}\r\n\r\n/* =================================\r\n   Main Content\r\n   ================================= */\r\n.main-content {\r\n  flex: 1;\r\n  overflow-y: auto;\r\n  padding: 24px 32px;\r\n}\r\n\r\n/* =================================\r\n   Alerts\r\n   ================================= */\r\n.success-alert,\r\n.error-alert {\r\n  padding: 14px 16px;\r\n  margin-bottom: 20px;\r\n  border-radius: 8px;\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n  animation: slideDown 0.3s ease;\r\n}\r\n\r\n@keyframes slideDown {\r\n  from {\r\n    opacity: 0;\r\n    transform: translateY(-10px);\r\n  }\r\n  to {\r\n    opacity: 1;\r\n    transform: translateY(0);\r\n  }\r\n}\r\n\r\n.success-alert {\r\n  background: #ecfdf5;\r\n  border: 1px solid #a7f3d0;\r\n  color: #047857;\r\n}\r\n\r\n.error-alert {\r\n  background: #fef2f2;\r\n  border: 1px solid #fecaca;\r\n  color: #dc2626;\r\n}\r\n\r\n.success-alert i,\r\n.error-alert i {\r\n  font-size: 18px;\r\n  flex-shrink: 0;\r\n}\r\n\r\n.success-alert span,\r\n.error-alert span {\r\n  flex: 1;\r\n  font-size: 14px;\r\n}\r\n\r\n.alert-dismiss {\r\n  background: none;\r\n  border: none;\r\n  padding: 4px;\r\n  cursor: pointer;\r\n  opacity: 0.7;\r\n  transition: opacity 0.2s;\r\n}\r\n\r\n.alert-dismiss:hover {\r\n  opacity: 1;\r\n}\r\n\r\n.success-alert .alert-dismiss {\r\n  color: #047857;\r\n}\r\n\r\n.error-alert .alert-dismiss {\r\n  color: #dc2626;\r\n}\r\n\r\n/* =================================\r\n   Loading State\r\n   ================================= */\r\n.loading-container {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  padding: 80px 20px;\r\n  gap: 16px;\r\n}\r\n\r\n.loading-spinner {\r\n  width: 40px;\r\n  height: 40px;\r\n  border: 3px solid #e5e7eb;\r\n  border-top-color: #2c5f3f;\r\n  border-radius: 50%;\r\n  animation: spin 0.8s linear infinite;\r\n}\r\n\r\n@keyframes spin {\r\n  to { transform: rotate(360deg); }\r\n}\r\n\r\n.loading-container p {\r\n  font-size: 14px;\r\n  color: #6b7280;\r\n  margin: 0;\r\n}\r\n\r\n/* =================================\r\n   Chart Section\r\n   ================================= */\r\n.chart-section {\r\n  margin-bottom: 24px;\r\n}\r\n\r\n.chart-card {\r\n  background: #ffffff;\r\n  border-radius: 12px;\r\n  padding: 24px;\r\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\r\n  border: 1px solid #e5e7eb;\r\n}\r\n\r\n.chart-header {\r\n  margin-bottom: 20px;\r\n}\r\n\r\n.chart-title-group {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 4px;\r\n}\r\n\r\n.chart-title {\r\n  font-size: 16px;\r\n  font-weight: 600;\r\n  color: #1f2937;\r\n  margin: 0;\r\n}\r\n\r\n.chart-subtitle {\r\n  font-size: 13px;\r\n  color: #6b7280;\r\n  margin: 0;\r\n}\r\n\r\n.chart-body {\r\n  min-height: 200px;\r\n}\r\n\r\n.balance-chart {\r\n  width: 100%;\r\n  height: 200px;\r\n}\r\n\r\n.chart-empty {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  height: 200px;\r\n  color: #9ca3af;\r\n}\r\n\r\n.chart-empty i {\r\n  font-size: 40px;\r\n  margin-bottom: 12px;\r\n  opacity: 0.5;\r\n}\r\n\r\n.chart-empty p {\r\n  font-size: 14px;\r\n  margin: 0;\r\n}\r\n\r\n/* =================================\r\n   Controls Section\r\n   ================================= */\r\n.controls-section {\r\n  margin-bottom: 24px;\r\n}\r\n\r\n.controls-card {\r\n  background: #ffffff;\r\n  border-radius: 12px;\r\n  padding: 20px 24px;\r\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);\r\n  border: 1px solid #e5e7eb;\r\n}\r\n\r\n.controls-row {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 12px;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.search-group {\r\n  flex: 1;\r\n  min-width: 280px;\r\n  position: relative;\r\n}\r\n\r\n.search-icon {\r\n  position: absolute;\r\n  left: 14px;\r\n  top: 50%;\r\n  transform: translateY(-50%);\r\n  color: #9ca3af;\r\n  font-size: 14px;\r\n  pointer-events: none;\r\n}\r\n\r\n.search-input {\r\n  width: 100%;\r\n  padding: 10px 14px 10px 40px;\r\n  border: 1px solid #e5e7eb;\r\n  border-radius: 8px;\r\n  font-size: 14px;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.search-input:focus {\r\n  outline: none;\r\n  border-color: #2c5f3f;\r\n  box-shadow: 0 0 0 3px rgba(44, 95, 63, 0.1);\r\n}\r\n\r\n.search-input::placeholder {\r\n  color: #9ca3af;\r\n}\r\n\r\n.btn-primary {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n  padding: 10px 18px;\r\n  background: #2c5f3f;\r\n  color: #ffffff;\r\n  border: none;\r\n  border-radius: 8px;\r\n  font-size: 14px;\r\n  font-weight: 600;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n  white-space: nowrap;\r\n}\r\n\r\n.btn-primary:hover {\r\n  background: #1e4620;\r\n  box-shadow: 0 4px 12px rgba(44, 95, 63, 0.2);\r\n}\r\n\r\n.btn-primary i {\r\n  font-size: 12px;\r\n}\r\n\r\n.btn-filter {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n  padding: 10px 16px;\r\n  background: #ffffff;\r\n  color: #374151;\r\n  border: 1px solid #e5e7eb;\r\n  border-radius: 8px;\r\n  font-size: 14px;\r\n  font-weight: 500;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.btn-filter:hover {\r\n  background: #f9fafb;\r\n  border-color: #d1d5db;\r\n}\r\n\r\n.btn-filter.active {\r\n  background: #f0fdf4;\r\n  border-color: #2c5f3f;\r\n  color: #2c5f3f;\r\n}\r\n\r\n.toggle-icon {\r\n  font-size: 10px;\r\n  transition: transform 0.2s;\r\n}\r\n\r\n.toggle-icon.rotated {\r\n  transform: rotate(180deg);\r\n}\r\n\r\n/* Filters Panel */\r\n.filters-panel {\r\n  margin-top: 16px;\r\n  padding-top: 16px;\r\n  border-top: 1px solid #f3f4f6;\r\n  animation: slideDown 0.2s ease;\r\n}\r\n\r\n.filters-grid {\r\n  display: grid;\r\n  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));\r\n  gap: 16px;\r\n  align-items: end;\r\n}\r\n\r\n.filter-group {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 6px;\r\n}\r\n\r\n.filter-group label {\r\n  font-size: 12px;\r\n  font-weight: 600;\r\n  color: #6b7280;\r\n  text-transform: uppercase;\r\n  letter-spacing: 0.5px;\r\n}\r\n\r\n.filter-group select {\r\n  padding: 8px 12px;\r\n  border: 1px solid #e5e7eb;\r\n  border-radius: 6px;\r\n  font-size: 14px;\r\n  background-color: #ffffff;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.filter-group select:hover {\r\n  border-color: #d1d5db;\r\n}\r\n\r\n.filter-group select:focus {\r\n  outline: none;\r\n  border-color: #2c5f3f;\r\n  box-shadow: 0 0 0 3px rgba(44, 95, 63, 0.1);\r\n}\r\n\r\n.filter-actions {\r\n  justify-content: flex-end;\r\n}\r\n\r\n.btn-reset {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 6px;\r\n  padding: 8px 14px;\r\n  background: #ffffff;\r\n  color: #6b7280;\r\n  border: 1px solid #e5e7eb;\r\n  border-radius: 6px;\r\n  font-size: 13px;\r\n  font-weight: 500;\r\n  cursor: pointer;\r\n  transition: all 0.2s;\r\n}\r\n\r\n.btn-reset:hover {\r\n  background: #f9fafb;\r\n  color: #374151;\r\n  border-color: #d1d5db;\r\n}\r\n\r\n.btn-reset i {\r\n  font-size: 12px;\r\n}\r\n\r\n/* Results Summary */\r\n.results-summary {\r\n  margin-top: 12px;\r\n  padding-top: 12px;\r\n  border-top: 1px solid #f3f4f6;\r\n  font-size: 13px;\r\n  color: #6b7280;\r\n}\r\n\r\n/* =================================\r\n   Table Section\r\n   ================================= */\r\n.table-section {\r\n  /* Table styles come from user-table.component */\r\n}\r\n\r\n/* =================================\r\n   Responsive Design\r\n   ================================= */\r\n@media (max-width: 1024px) {\r\n  .main-content {\r\n    padding: 20px;\r\n  }\r\n\r\n  .chart-card,\r\n  .controls-card {\r\n    padding: 20px;\r\n  }\r\n\r\n  .filters-grid {\r\n    grid-template-columns: repeat(2, 1fr);\r\n  }\r\n}\r\n\r\n@media (max-width: 768px) {\r\n  .page-header {\r\n    padding: 14px 20px;\r\n    flex-wrap: wrap;\r\n    gap: 12px;\r\n  }\r\n\r\n  .page-title {\r\n    font-size: 18px;\r\n  }\r\n\r\n  .main-content {\r\n    padding: 16px;\r\n  }\r\n\r\n  .controls-row {\r\n    flex-direction: column;\r\n    align-items: stretch;\r\n  }\r\n\r\n  .search-group {\r\n    min-width: 100%;\r\n  }\r\n\r\n  .btn-primary,\r\n  .btn-filter {\r\n    width: 100%;\r\n    justify-content: center;\r\n  }\r\n\r\n  .filters-grid {\r\n    grid-template-columns: 1fr;\r\n  }\r\n\r\n  .user-info {\r\n    display: none;\r\n  }\r\n\r\n  .balance-chart {\r\n    height: 180px;\r\n  }\r\n}\r\n\r\n/* =================================\r\n   Scrollbar Styling\r\n   ================================= */\r\n.main-content::-webkit-scrollbar {\r\n  width: 8px;\r\n}\r\n\r\n.main-content::-webkit-scrollbar-track {\r\n  background: #f1f5f9;\r\n}\r\n\r\n.main-content::-webkit-scrollbar-thumb {\r\n  background: #cbd5e1;\r\n  border-radius: 4px;\r\n}\r\n\r\n.main-content::-webkit-scrollbar-thumb:hover {\r\n  background: #94a3b8;\r\n}\r\n\r\n/* =================================\r\n   Accessibility\r\n   ================================= */\r\n@media (prefers-reduced-motion: reduce) {\r\n  .loading-spinner {\r\n    animation: none;\r\n  }\r\n  \r\n  .toggle-icon {\r\n    transition: none;\r\n  }\r\n}\r\n"] }]
    }], () => [{ type: i1.AdminUsersService }, { type: i2.AuthService }, { type: i0.ChangeDetectorRef }], { drawerComponent: [{
            type: ViewChild,
            args: [UserDetailDrawerComponent]
        }], addUserModalComponent: [{
            type: ViewChild,
            args: [AddUserModalComponent]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AdminUsersComponent, { className: "AdminUsersComponent", filePath: "src/app/pages/admin/users/admin-users.component.ts", lineNumber: 63 }); })();
//# sourceMappingURL=admin-users.component.js.map