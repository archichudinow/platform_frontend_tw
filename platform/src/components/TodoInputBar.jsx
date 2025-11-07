import { useState } from 'react';
import { useAddTodo } from '../api/useTodos';



export default function TodoInputBar() {
    const [userInputState, setUserInputState] = useState('');
    const addTodo = useAddTodo();

    const loadingState = addTodo.isPending;

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo.mutate(userInputState);
        setUserInputState('');
    };

    return (
        <div>
            <form className="flex justify-between px-4 pb-10 gap-5 min-h-14" onSubmit={handleSubmit}>
                <input 
                    className="rounded-lg w-full h-10 px-3 py-1 focus:outline-0 placeholder-primary bg-panel" 
                    type="text" 
                    placeholder="Add your todo here..."
                    value={userInputState}
                    onChange={(e) => setUserInputState(e.target.value)}
                    />
                <button 
                    className="rounded-lg w-10 h-10 item-center justify-center bg-panel" 
                    type="submit"
                    disabled={loadingState}
                    >{loadingState ? "" : "+"}</button>
            </form>
        </div>
    );
}