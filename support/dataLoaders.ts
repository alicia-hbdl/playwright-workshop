import * as fs from 'fs';
import { parse } from 'csv-parse/sync';
import { Product } from '../dataClass/Product';
import { User } from '../dataClass/User';

export function loadProductData(): Product[] {
    return parse(fs.readFileSync('./testData/products.csv', 'utf-8'), {
        columns: true,
        skip_empty_lines: true
    });
}

export function loadUserData(): User[] {
    return parse(fs.readFileSync('./testData/users.csv', 'utf-8'), {
        columns: true,
        skip_empty_lines: true
    }).map((user: any) => {
        return {
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            address: {
                country: user.country,
                streetAddress: user.streetAddress,
                zipCode: user.zipCode,
                town: user.town,
            },
            emailAddress: user.emailAddress,
            valid: user.valid === 'true',
        }
    });
}
