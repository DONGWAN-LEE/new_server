import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, In, QueryRunner, Repository} from 'typeorm';
import { user_gate } from '../../entities/gate/user_gate.entity';

@Injectable()
export class user_gate_table {
    /*constructor(private readonly dataSource: DataSource) {
        
    }*/
    constructor(
        @InjectRepository(user_gate, 'gateDB')
        private repository: Repository<user_gate>,
        private readonly dataSource: DataSource
    ) {}

    async get_lists() : Promise<user_gate[]> {
        return await this.repository.find();
    }

    async get_user_gate(where_params: Object) : Promise<user_gate[]> {
        return await this.repository.find({
            select: ['Uidx', 'Uid', 'Usn', 'Os', 'Dbnum', 'Gmmode', 'Nickname', 'Deviceuuid'],
            where: {
                Usn: where_params[0],
                Withraw: 1,
            }
            // skip: 0,
            // take: 1,
        })
    }

    async get_user_gate_by_uid_usn(where_params: Object) : Promise<user_gate[]> {
        return await this.repository.find({
            select: ['Uidx', 'Uid', 'Usn', 'Os', 'Dbnum', 'Gmmode', 'Nickname', 'Deviceuuid'],
            where: {
                Uid: where_params[0],
                Usn: where_params[1],
                Withraw: 1,
            }
            // skip: 0,
            // take: 1,
        })
    }

    async add(add_param: Object) {
        return await this.repository.save(add_param);
    }

    async set(Uidx:number, update_params: Object) {
        return await this.repository.update(Uidx, update_params);
    }

    //initalize the database
    async init(): Promise<QueryRunner> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        return queryRunner;
    }
}