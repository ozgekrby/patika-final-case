import { Client } from '@elastic/elasticsearch'
import elasticConfig from '../config/elastic.config.js'

const elasticClient = new Client({ node: elasticConfig.host })

export default elasticClient