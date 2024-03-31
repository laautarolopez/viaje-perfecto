import CardBg from '../../components/CardBg';
import IconsRow from '@/components/IconsRow';

const Vuelo = () => {
    return (
        <div className="p-5 mb-5 relative overflow-hidden">
            <CardBg />
            <div className="flex flex-row mt-3">
                <h2 className="relative text-4xl font-bold">Sur Argentino</h2>
            </div>
            <IconsRow />
        </div>
    )
}

export default Vuelo;