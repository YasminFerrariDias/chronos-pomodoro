import { Heading } from './components/Heading';

import './styles/theme.css';
import './styles/global.css';
import { TimerIcon } from 'lucide-react';

export function App() {
    return (
        <>
            <Heading>
                Hello, World!
                <button>
                    <TimerIcon />
                </button>    
            </Heading>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui ratione ut eos, facilis sed maiores recusandae nesciunt dolore. Ipsam ex hic iure adipisci facilis dolorem odit nam esse doloribus facere!</p>
        </>
    )
}
