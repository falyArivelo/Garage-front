import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Tableau de Bord',
    iconName: 'bx:stats',
    route: '/dashboard',
  },
  {
    displayName: 'Mes Véhicules',
    iconName: 'mingcute:car-line',
    // route: '/vehicles/me',
    children: [
      {
        displayName: 'Tous les Véhicules',
        route: '/vehicles/me',
        iconName: 'ic:outline-directions-car', // optionnel
      },
      {
        displayName: 'Ajouter un Véhicule',
        route: '/vehicles/add',
        iconName: 'ic:outline-add-circle', // optionnel
      }
    ]
  },
  {
    displayName: 'Rendez Vous',
    iconName: 'material-symbols:schedule-outline-rounded',
    children: [
      {
        displayName: 'Rendez Vous',
        iconName: 'material-symbols:schedule-outline-rounded',
        route: '/appointments/book',
      },
      {
        displayName: 'Mes Rendez-Vous',
        route: '/appointments/allClient',
        iconName: 'ic:outline-handyman',
        role :['client'],
      }
    ]
  },
  {
    displayName: 'Pièces',
    iconName: 'ic:outline-build',
    role :['manager', 'mecanicien'],
    children: [
      {
        displayName: 'Tous les Pièces',
        route: '/pieces/addButton',
        iconName: 'ic:outline-handyman',
        role :['manager'],
      },
      {
        displayName: 'Nos Pièces',
        route: '/pieces/all',
        iconName: 'ic:outline-handyman',
        role :['manager', 'mecanicien'],
      },
      {
        displayName: 'Ajouter une Pièce',
        route: '/pieces/add',
        iconName: 'ic:outline-add-circle',
        role :['manager'],
      }
    ]
  },
  {
    displayName: 'Services',
    iconName: 'ic:outline-settings',
    children: [
      {
        displayName: 'Tous les Services',
        route: '/services/addButton',
        iconName: 'ic:outline-miscellaneous-services',
        role :['manager'],
      },
      {
        displayName: 'Nos Services',
        route: '/services/all',
        iconName: 'ic:outline-miscellaneous-services',
        role :['manager', 'mecanicien'],
      },
      {
        displayName: 'Ajouter un Service',
        route: '/services/add',
        iconName: 'ic:outline-add-box',
        role :['manager'],
      },
      {
        displayName: 'Tous Nos Services',
        route: '/services/allCard',
        iconName: 'ic:outline-construction',
        role :['manager', 'mecanicien', 'client'],
      }
    ]
  },
  {
    navCap: 'Ui Components',
    divider: true
  },
  {
    displayName: 'Badge',
    iconName: 'solar:archive-minimalistic-line-duotone',
    route: '/ui-components/badge',
  },
  {
    displayName: 'Chips',
    iconName: 'solar:danger-circle-line-duotone',
    route: '/ui-components/chips',
  },
  {
    displayName: 'Lists',
    iconName: 'solar:bookmark-square-minimalistic-line-duotone',
    route: '/ui-components/lists',
  },
  {
    displayName: 'Menu',
    iconName: 'solar:file-text-line-duotone',
    route: '/ui-components/menu',
  },
  {
    displayName: 'Tooltips',
    iconName: 'solar:text-field-focus-line-duotone',
    route: '/ui-components/tooltips',
  },
  {
    displayName: 'Forms',
    iconName: 'solar:file-text-line-duotone',
    route: '/ui-components/forms',
  },
  {
    displayName: 'Tables',
    iconName: 'solar:tablet-line-duotone',
    route: '/ui-components/tables',
  },

  {
    navCap: 'Extra',
    divider: true
  },
  {
    displayName: 'Icons',
    iconName: 'solar:sticker-smile-circle-2-line-duotone',
    route: '/extra/icons',
  },
  {
    displayName: 'Sample Page',
    iconName: 'solar:planet-3-line-duotone',
    route: '/extra/sample-page',
  },
  // {
  //   divider: true,
  //   navCap: 'Auth',
  // },
  // {
  //   displayName: 'Login',
  //   iconName: 'solar:lock-keyhole-minimalistic-line-duotone',
  //   route: '/authentication',
  //   children: [
  //     {
  //       displayName: 'Login',
  //        subItemIcon: true,
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       route: '/authentication/login',
  //     },
  //   ],
  // },
  // {
  //   displayName: 'Register',
  //   iconName: 'solar:user-plus-rounded-line-duotone',
  //   route: '/authentication',
  //   children: [
  //     {
  //       displayName: 'Register',
  //        subItemIcon: true,
  //       iconName: 'solar:round-alt-arrow-right-line-duotone',
  //       route: '/authentication/register',
  //     },
  //   ],
  // },
];
