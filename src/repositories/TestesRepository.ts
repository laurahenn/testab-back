import { EntityRepository, Repository } from 'typeorm';

import Testes from '../models/Testes';

@EntityRepository(Testes)
class TestesRepository extends Repository<Testes> {

}

export default TestesRepository;
