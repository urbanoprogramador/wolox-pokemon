import React from 'react';
import { fireEvent, render, waitFor } from "@testing-library/react";
jest.setTimeout(10000);

import '@testing-library/jest-dom'
import { Datatable } from '../../../../core/template/datatable/Datatable';
import { Provider } from 'react-redux';
import { store } from './../../../../core/store/store';
import { actionLoadConfigTheme } from 'core/store/theme/actions/action';
import { data } from './data';


describe("Probando el DataTable", () => {

  test('Carga completa de el componente table y sus partes', () => {

    store.dispatch(actionLoadConfigTheme({ payload: { width: 700 } }));
    render(<Provider store={store}>
      < Datatable data={data} fieldname={[

        {
          fieldname: 'id',
          key: 'id'

        }, {
          fieldname: 'nombre',
          key: 'nombre'

        },
        {
          fieldname: 'Correo',
          key: 'email'
        },
        {
          fieldname: 'telefono',
          key: 'telefono',
        }
      ]} />
    </Provider>);


    expect(document.querySelector('.dataTableContent')).toMatchSnapshot();
    //uexpect(screen.debug()).toBe('uno');
  });


  test('Prueba de que se pasa un parametro custom para el header de la tabla ', () => {

    store.dispatch(actionLoadConfigTheme({ payload: { width: 700 } }));
    render(<Provider store={store}>
      < Datatable data={data} fieldname={[

        {
          fieldname: 'id',
          key: 'id'

        }, {
          fieldname: 'nombre',
          key: 'nombre'

        },
        {
          fieldname: 'Correo',
          key: 'email'
        },
        {
          fieldname: 'telefono',
          key: 'telefono',
        }
      ]} />
    </Provider>);

    expect(document.querySelectorAll('.dataTableContent th')[2].innerHTML).toBe('Correo');
    expect(document.querySelectorAll('.dataTableContent th')[3].innerHTML).toBe('telefono');
    //uexpect(screen.debug()).toBe('uno');
  });
  test('Prueba a la input busqueda del datatable buscando por "usuario uno"', async () => {

    store.dispatch(actionLoadConfigTheme({ payload: { width: 700 } }));
    render(<Provider store={store}>
      < Datatable data={data} fieldname={[

        {
          fieldname: 'id',
          key: 'id'

        }, {
          fieldname: 'nombre',
          key: 'nombre'

        },
        {
          fieldname: 'Correo',
          key: 'email'
        },
        {
          fieldname: 'telefono',
          key: 'telefono',
        }
      ]} />
    </Provider>);
    const input = document.querySelector('input');
    if (input) {
      fireEvent.change(input, { target: { value: 'usuario uno' } });
    }
    await waitFor(() => {expect(document.querySelectorAll('tbody td')[2].innerHTML).toEqual("correo@usuario.uno"); }, {
      timeout: 5000,
    });

    //expect(document.querySelectorAll('tbody').length).toBe(1);
    //uexpect(screen.debug()).toBe('uno');
  });


  test('Prueba a la input busqueda del datatable buscando algo que no existe "abcdefjs"', async () => {

    store.dispatch(actionLoadConfigTheme({ payload: { width: 700 } }));
    render(<Provider store={store}>
      < Datatable data={data} fieldname={[

        {
          fieldname: 'id',
          key: 'id'

        }, {
          fieldname: 'nombre',
          key: 'nombre'

        },
        {
          fieldname: 'Correo',
          key: 'email'
        },
        {
          fieldname: 'telefono',
          key: 'telefono',
        }
      ]} />
    </Provider>);
    const input = document.querySelector('input');
    if (input) {
      fireEvent.change(input, { target: { value: 'abcdefjsasdfasdf' } });
    }
    await waitFor(() => {expect(document.querySelector('tbody td')?.innerHTML).toEqual("Item No encontrado"); }, {
      timeout: 5000,
    });

    
    //uexpect(screen.debug()).toBe('uno');
  });

});
