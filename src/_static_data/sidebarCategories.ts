const sidebarData = {
  versions: ['1.0.1', '1.1.0-alpha', '2.0.0-beta1'],
  navMain: [
    {
      title: 'Browse Inventory',
      url: '#',
      items: [
        {
          title: 'Browse All',
          url: '/dashboard/inventory',
        },
      ],
    },
    {
      title: 'Manage Inventory',
      url: '#',
      items: [
        { title: 'Products', url: '/dashboard/products' },
        { title: 'Categories', url: '/dashboard/categories' },
        { title: 'Manufacturers', url: '/dashboard/manufacturers' },
      ],
    },
    {
      title: 'Manage Account',
      url: '#',
      items: [{ title: 'User Management', url: '/dashboard/users' }],
    },
  ],
};

export { sidebarData };
