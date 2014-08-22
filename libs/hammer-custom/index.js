var Hammer = require('./hammer.js');
require('./plugins/hammer.fakemultitouch.js')(Hammer);
require('./plugins/hammer.showtouches.js')(Hammer);
// default settings
//Hammer.defaults.touchAction = 'pan-y'
module.exports = Hammer;