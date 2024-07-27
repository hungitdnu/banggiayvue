import { library } from '@fortawesome/fontawesome-svg-core';
import { faCartPlus, fas, faTimes } from '@fortawesome/free-solid-svg-icons';

import FontAwesomeIcon from '@/lib/FontAwesomeIcon.vue';

library.add(fas, faCartPlus, faTimes);

export { FontAwesomeIcon };
