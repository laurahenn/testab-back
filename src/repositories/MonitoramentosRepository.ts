import { EntityRepository, Repository } from 'typeorm';

import Monitoramentos from '../models/Monitoramentos';

@EntityRepository(Monitoramentos)
class MonitoramentosRepository extends Repository<Monitoramentos> {

}

export default MonitoramentosRepository;
