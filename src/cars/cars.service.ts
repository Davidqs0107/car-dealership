import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto, UpdateCarDto } from './dto';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid'

@Injectable()
export class CarsService {

  private cars: Car[] = [
    {
      id: uuid(),
      model: "xz",
      brand: "Toyota"
    },
    {
      id: uuid(),
      model: "zxx",
      brand: "Picanto"
    },
    {
      id: uuid(),
      model: "alto",
      brand: "Vitara"
    }
  ]
  create(createCarDto: CreateCarDto) {
    const car: Car = {
      id: uuid(),
      ...createCarDto
    }
    this.cars.push(car)
    return car;
  }

  findAll() {
    return this.cars;
  }

  findOne(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) {
      throw new NotFoundException(`Car with id ${id} not found`);
    }
    return car;
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    let carDB = this.findOne(id);
    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDB = { ...carDB, ...updateCarDto, id }
        return carDB;
      }
      return car;
    });

    return carDB;
  }

  remove(id: string) {
    this.findOne(id);
    this.cars = this.cars.filter((car) => car.id !== id);
  }
}
