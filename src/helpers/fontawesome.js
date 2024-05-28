// import the library
import { library } from '@fortawesome/fontawesome-svg-core';

// import your icons
import {
  faStar as faStarSolid,
  faEdit as faEditSolid,
  faTrash as faTrashSolid,
} from '@fortawesome/free-solid-svg-icons';

import {
  faStar as faStarRegular,
  faEdit as faEditRegular,
} from '@fortawesome/free-regular-svg-icons';

library.add(
  faStarSolid,
  faStarRegular,
  faEditSolid,
  faEditRegular,
  faTrashSolid,
  // more icons go here
);