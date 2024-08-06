const { MongoClient, ServerApiVersion } = require('mongodb')

const uri =
  'mongodb+srv://ycp998:kimchun2636!@clustereditor.olltcn7.mongodb.net/?retryWrites=true&w=majority&appName=ClusterEditor'
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const mongoDBClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await mongoDBClient.connect()
    // Send a ping to confirm a successful connection
    await mongoDBClient.db('admin').command({ ping: 1 })
    console.log('Pinged your deployment. You successfully connected to MongoDB!')
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoDBClient.close()
  }
}

run().catch(console.dir)
