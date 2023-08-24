import { FaSearchLocation } from "react-icons/fa";

function Header() {
	return (
		<div className="header mb-5">
			<form action="" className="flex align-start">
				<input
					className="py-[8px] px-3 rounded-tl-lg rounded-bl-lg focus:outline-none  w-[100%]"
					type="text"
					placeholder="Enter your city"
				/>
				<button className="bg-white py-3 px-3 rounded-tr-lg rounded-br-lg">
					<FaSearchLocation />
				</button>
			</form>
		</div>
	);
}

export default Header;
