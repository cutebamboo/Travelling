const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');


const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);
console.log(DB);

const gcd1105Schema = new mongoose.Schema(
  { studentName: {
      type: String,
      required: [true,'The student name is not a string']
    }
  }
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'))
  .then(async ()=>  {
      // Read the document in GCD1105 Collection

    const gcd1105DB = mongoose.model('gcd1105docs', gcd1105Schema);
    
    try{
      /* await gcd1105DB.create({
        "studentName": "NGuyen Thanh Phong"
      }); */
      
      const data = await gcd1105DB.findOne();

      //data = await gcd1105DB.findById('65def84a6f89760c85749b75');

      console.log(data);

    }
    catch{ console.log('There has erros')};
  })
  .catch((err)=> console.log('There are erros', err));


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
