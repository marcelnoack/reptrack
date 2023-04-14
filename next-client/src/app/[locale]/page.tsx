export default function Home( { params }: {params: {lang: string}} ) {
    return <div>
        {JSON.stringify( params )}
    </div>
}
