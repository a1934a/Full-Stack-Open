const Course = ({ course }) => {
    const Header = (props) => {
        return (
            <div>
                <h1>{props.name}</h1>
            </div>
        )
    }

    const Part = Props => {
        return (
            <>
                <p>{Props.part.name} {Props.part.exercises}</p>
            </>
        )
    }

    const Content = (props) => {
        const parts = props.parts
        return (
            <div>
                {parts.map(
                    part => <Part key={part.id} part={part} />
                )}
            </div>
        )
    }

    const Total = (props) => {
        const parts = props.parts

        let total = parts.reduce((acc,cur)=> acc + cur.exercises,0)

        // let total = 0
        // parts.forEach(part => {
        //     total += part.exercises
        // });
        return (
            <div>
                <p>Total number of exercises {total}</p>
            </div>
        )
    }



    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course