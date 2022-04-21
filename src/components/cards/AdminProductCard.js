import React from "react";
import { Card } from 'antd';
import defaultImage from "../../images/defaultImage.png";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {Link} from "react-router-dom";

const { Meta } = Card;

const AdminProductCard = ({product, handleRemove}) => {
    const { title, description, images, slug } = product;
    return (
        <Card
            hoverable
            cover={<img 
                className="p-1"
                style={{ height: "150px", objectFit: "cover" }}
                src={images && images.length ? images[0].url : defaultImage}/>
            }
            actions={[
                <Link to={`/admin/product/${slug}`}>
                    <EditOutlined/>
                </Link>,
                <DeleteOutlined onClick={() => handleRemove(slug)}/>
            ]}
         >
            <Meta 
                title={title} 
                description={`${description && description.substring(0, 25)}...`}
            />
        </Card>
        
    )
}

export default AdminProductCard;