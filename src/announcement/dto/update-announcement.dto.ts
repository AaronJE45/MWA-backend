import { IsString } from "class-validator";
export class UpdateAnnouncementDto{
    @IsString()
    title: string;
    @IsString()
    content: string;
    @IsString()
    userId: string;
}
