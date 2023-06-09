const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const platformsSchema = new Schema({
  name: {
    type: 'string',
    unique: true,
  },
  info: String,
  image: String,
  active: Boolean
})


platformsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Platforms = model('Platforms', platformsSchema)
platformsSchema.plugin(uniqueValidator)

module.exports = Platforms