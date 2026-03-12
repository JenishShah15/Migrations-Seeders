import { AppDataSource } from "./data-source";
import { AccountTypesSeeder } from "./seeders/account-types.seeder";


async function  runseed() {
    try{
        await AppDataSource.initialize();
        console.log("Database Connected");
        const accountTypeSeeder = new AccountTypesSeeder();
        await accountTypeSeeder.run(AppDataSource);
        console.log("Account Type Seeded Succesfully");
        await AppDataSource.destroy();

    }catch(error)
    {
            console.error("seedign error",error);
        }
    
}

runseed();