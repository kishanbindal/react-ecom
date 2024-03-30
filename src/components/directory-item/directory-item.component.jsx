import { useNavigate } from "react-router-dom"
import { BackgroundImage, Body, DirectoryItemContainer } from "./directory-item.styles"


const DirectoryItem = ({category}) => {
  const navigate = useNavigate();
  const {id, title, imageUrl, route} = category

  let navHandler = () => navigate(route);

  return(
    <DirectoryItemContainer>
        <BackgroundImage 
          imageUrl={imageUrl}>
        </BackgroundImage>

        <Body onClick={navHandler}>
          <h2>{title}</h2>
          <p>Shop Now</p>
        </Body>
    </DirectoryItemContainer>
  )
}

export default DirectoryItem