import { EntityRepository, Repository } from 'typeorm';

import TestesAB from '../models/TestesAB';

@EntityRepository(TestesAB)
class TestesABRepository extends Repository<TestesAB> {

}

export default TestesABRepository;
