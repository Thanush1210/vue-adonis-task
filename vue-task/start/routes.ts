import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/form', 'FormDataController.store');
  Route.get('/form', 'FormDataController.index');
  Route.put('/form/:id','FormDataController.update');
  Route.delete('form/:id','FormDataController.destroy')
}).prefix('/api');
