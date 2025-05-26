"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UserDto {
}
exports.UserDto = UserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: "Уникальный идентификатор пользователя",
    }),
    __metadata("design:type", Number)
], UserDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Руслан", description: "Имя пользователя" }),
    __metadata("design:type", String)
], UserDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Синкевич", description: "Фамилия пользователя" }),
    __metadata("design:type", String)
], UserDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "+79501234567", description: "Телефон пользователя" }),
    __metadata("design:type", String)
], UserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Хеш пароля", writeOnly: true }),
    __metadata("design:type", String)
], UserDto.prototype, "passwordHash", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "16", description: "Номер дома" }),
    __metadata("design:type", String)
], UserDto.prototype, "houseNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, description: "Статус подтверждения" }),
    __metadata("design:type", Boolean)
], UserDto.prototype, "isConfirmed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "2025-05-26T12:34:56.789Z",
        description: "Дата создания",
    }),
    __metadata("design:type", Date)
], UserDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "2025-05-26T12:34:56.789Z",
        description: "Дата последнего обновления",
    }),
    __metadata("design:type", Date)
], UserDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=create-user.dto.js.map