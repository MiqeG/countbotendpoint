

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const axios = require('axios')
app.use(bodyParser.json());
let dateMessage = ''
let date='06-06-2019-09:00:00'
let locale='en'
app.post('/endpoint', (req, res) => {
    axios.get('https://2gl2bug4fj.execute-api.eu-west-3.amazonaws.com/latest/countdown?date='+date+'&locale='+locale, {

    }).then(function (response) {
        dateMessage = 'REMAINING TIME: ' + response.data.remainingFormatted
        let json = makeJSON(req.body.conversation.memory, dateMessage)
        res.json(json)
    }).catch(function(error){
        let json = makeJSON(req.body.conversation.memory,'An error occured when calling countdown api')
        res.json(json)
    })


})
function makeJSONCarousel(memory, items) {
    let elements = []
    items.forEach(element => {
        let xx = {
            title: element.title,
            imageUrl: element.imageUrl,
            subtitle: "",
            buttons: element.buttons
        }
        elements.unshift(xx)
    });
    let json = {
        replies: [
            {

                type: "carousel",
                content: {
                    elements: elements
                },
                delay: null
            }
        ],
        conversation: { memory: memory },
    };
    return json
}

function makeJSONcard(memory, params) {
    let json = {
        replies: [
            {
                type: "card",
                content: {
                    title: params.title,
                    subtitle: params.subtitle,
                    imageUrl: params.imageUrl,
                    buttons: params.buttons
                },
                delay: null
            }
        ],
        conversation: { memory: memory },
    };
    return json
}
function makeJSON(memory, message) {
    let json = {
        replies: [
            {
                type: 'text',
                content: message,
                delay: null
            },

        ],
        conversation: { memory: memory },
    };
    return json
}
function makeJSONgroup(memory, messages) {
    let json = {
        replies: messages,
        conversation: { memory: memory },
    };
    return json
}

module.exports = app