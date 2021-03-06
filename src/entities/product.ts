import { Entity, UniqueEntityID } from '@entities';
import { Result } from '@shared/Result';

interface IProductProps {
    name: string;
    description: string;
    price: number;
};

export class Product extends Entity<IProductProps>{

    get name (): string {
        return this.props.name;
    }

    get description (): string {
        return this.props.description;
    }

    get price(): number {
        return this.props.price;
    }

    private constructor (props: IProductProps, id?: UniqueEntityID) {
        super(props, id);
    }  

    public static build(props: IProductProps, id?: UniqueEntityID): Result<Product> { 
        /** some domain validations here **/
        const errors: Array<string> = [];

        if (props.price < 0) {
            errors.push('price_too_low');
        }

        if(errors.length > 0) {
            return Result.fail<Product>(errors);
        }

        return Result.success<Product>(new Product(props, id));
    }
}
