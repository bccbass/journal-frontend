import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { render, screen } from '@testing-library/react'
import userEvent  from '@testing-library/user-event'


// describe('App Component', () => { 
//     it('Renders the home component and displays journal entries heading', () => {
//         render(
//             <BrowserRouter>
//             <   App />
//             </BrowserRouter>
//         )   
//         expect(screen.getByRole('heading', {level: 2})).toHaveTextContent('Journal Entries');
//     })
//  })

//  different approach:
 describe('App Component',  () => { 
    let container
    
    beforeEach(() => {
        container = render(
            <BrowserRouter>
            <   App />
            </BrowserRouter>
        ).container
    })

    it('Renders the home component and displays journal entries heading', () => {
        // returns html object - container is the root elemente domm 
  

        expect(container.querySelector('h2')).not.toBeNull();
        expect(container.querySelector('h2')).toHaveTextContent('Journal Entries')
    })

    it('Renders category selection component when New Entry link is Clicked from Nav', async () => {
        // returns html object - container is the root elemente domm 
        await userEvent.click(screen.getByText('New Entry'))

        expect(container.querySelector('h3')).not.toBeNull();
        expect(container.querySelector('h3')).toHaveTextContent('Choose a Category:')
    }) 
})