import { EntityRepository, Repository } from 'typeorm';

import TestesMonitoramentos from '../models/TestesMonitoramentos';

@EntityRepository(TestesMonitoramentos)
class TestesMonitoramentosRepository extends Repository<TestesMonitoramentos> {

}

export default TestesMonitoramentosRepository;
