const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const NewsletterSchema = mongoose.Schema({
  email: { type: 'string', unique: true },
})

NewsletterSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Newsletter', NewsletterSchema)
