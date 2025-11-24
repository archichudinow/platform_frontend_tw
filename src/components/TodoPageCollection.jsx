import MasonryGridCollection from "./MasonryGrid";

export default function TodoCollection() {

    return (
        <>

        <div className="mb-10 text-primary/50">
            <div className="flex justify-between px-4 pb-2">
                <h1>Today</h1>
                <h1>5/20</h1>
            </div>
            <div className="mx-4 mb-10 border-b  border-primary/50"></div>
            <MasonryGridCollection period={"current_day"}/>
        </div>

        <div className="mb-10 text-primary/50">
            <div className="flex justify-between px-4 pb-2">
                <h1>One Day Ago</h1>
                <h1>4/20</h1>
            </div>
            <div className="mx-4 mb-10 border-b border-primary/50"></div>
            <MasonryGridCollection period={"history_day_1"}/>
        </div>

        <div className="mb-10 text-primary/50">
            <div className="flex justify-between px-4 pb-2">
                <h1>Two Days Ago</h1>
                <h1>10/20</h1>
            </div>
            <div className="mx-4 mb-10 border-b border-primary/50"></div>
            <MasonryGridCollection period={"history_day_2"}/>
        </div>

        <div className="mb-10 text-primary/50">
            <div className="flex justify-between px-4 pb-2">
                <h1>Three Days Ago</h1>
                <h1>10/20</h1>
            </div>
            <div className="mx-4 mb-10 border-b border-primary/50"></div>
            <MasonryGridCollection period={"history_day_3"}/>
        </div>

        <div className="mb-10 text-primary/50">
            <div className="flex justify-between px-4 pb-2">
                <h1>Four Days Ago</h1>
                <h1>10/20</h1>
            </div>
            <div className="mx-4 mb-10 border-b border-primary/50"></div>
            <MasonryGridCollection period={"history_day_4"}/>
        </div>
        </>

    );
}