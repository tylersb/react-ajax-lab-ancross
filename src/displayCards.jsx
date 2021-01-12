const DisplayCards = (props) => {

    return (
        <div>
            {props.data.map((villager, i) => {
                return (
                <div key={i} className="villagerCard" onClick={() => props.clickie ? props.handleClick(villager) : null}>
                    <img className="villagerPic" src={villager['image_uri']} alt={villager.name['name-USen']} />
                    <p>{villager.name['name-USen']}</p>
                </div>
                )
            })}
        </div>
    )
}


export default DisplayCards