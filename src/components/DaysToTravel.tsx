const DaysToTravel = ({ className }: { className?: string }) => (
    <div className={"bg-green-300 text-green-900 rounded-3xl py-1 px-3 w-fit" + (className ? (' ' + className) : '')}>
        En 2 dias viajás
    </div>
)

export default DaysToTravel