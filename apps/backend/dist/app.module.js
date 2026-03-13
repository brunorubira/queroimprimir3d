"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const providers_module_1 = require("./providers/providers.module");
const printers_module_1 = require("./printers/printers.module");
const services_module_1 = require("./services/services.module");
const requests_module_1 = require("./requests/requests.module");
const attachments_module_1 = require("./attachments/attachments.module");
const matching_module_1 = require("./matching/matching.module");
const conversations_module_1 = require("./conversations/conversations.module");
const messages_module_1 = require("./messages/messages.module");
const proposals_module_1 = require("./proposals/proposals.module");
const orders_module_1 = require("./orders/orders.module");
const reviews_module_1 = require("./reviews/reviews.module");
const boosts_module_1 = require("./boosts/boosts.module");
const notifications_module_1 = require("./notifications/notifications.module");
const admin_module_1 = require("./admin/admin.module");
const prisma_module_1 = require("./prisma/prisma.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            providers_module_1.ProvidersModule,
            printers_module_1.PrintersModule,
            services_module_1.ServicesModule,
            requests_module_1.RequestsModule,
            attachments_module_1.AttachmentsModule,
            matching_module_1.MatchingModule,
            conversations_module_1.ConversationsModule,
            messages_module_1.MessagesModule,
            proposals_module_1.ProposalsModule,
            orders_module_1.OrdersModule,
            reviews_module_1.ReviewsModule,
            boosts_module_1.BoostsModule,
            notifications_module_1.NotificationsModule,
            admin_module_1.AdminModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map