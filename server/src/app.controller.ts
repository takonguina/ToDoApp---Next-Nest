import { All, Controller, NotFoundException } from '@nestjs/common';

@Controller()
export class AppController {
  // This route will catch all requests that do not match any other route
  @All('*')
  handleAll() {
    throw new NotFoundException('This route doest not exist');
  }
}
