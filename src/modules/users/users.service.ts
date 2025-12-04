import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { createUserDto } from './dto/create.user.dto';
import { Order } from '../orders/entities/order.entity';
import { Food } from '../foods/entities/food.entity';

@Injectable()
export class UsersService {

    constructor(
     @InjectModel(User)
     private userModel : typeof User 
    ){}

    async createUser(payload : createUserDto){
        try{
            const userExist = await this.userModel.findOne({where: {phone: payload.phone}});
            if(userExist) throw new ConflictException('User phone number already exists in the database');
            const fullname = payload.fullname
            const phone = payload.phone
            const newUser = await this.userModel.create({fullname, phone})
            return {
                success: true,
                message: `SUCCESSFULLY CREATED A NEW USER`,
                data: newUser
            };

        }catch(err){
            console.log(err);
            throw new InternalServerErrorException(err)
        }

    }
    async findAll(){
        try{
            return await this.userModel.findAll()
        }catch(e){
            throw new InternalServerErrorException(e)
            
        }
    }

    async findById(id: number){
        try {
            const checkExist = await this.userModel.findOne({where: {id}, include: [Order, Food] })
        if(!checkExist) throw new NotFoundException()
        return checkExist  
        } catch (error) {
            console.log(error.message);
             throw new InternalServerErrorException(error)
        }
    }
}
