import { connectMongoDB } from 'ok-backend-common/mongodb/connection.js';
import { seedPayment } from './payment.js'

const seedData = async () => {
  try {
    await connectMongoDB()
    console.log('Seed [started] please wait..')
    await seedPayment()

    console.log('Seed completed..')
  } catch (error) {
    console.log(error)
  }
}

seedData()