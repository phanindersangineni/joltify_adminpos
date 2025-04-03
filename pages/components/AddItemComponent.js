import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import Swal from "sweetalert2";


const AddItemComponent = ({ closeActionItem, item, openInvoiceAction,quantity }) => {
    const { cart,cartitems } = useAuth();
    
    const closeadditem = async () => {
        closeActionItem('additems');
    }
    const [variantlist, setVarianList] = useState(item?.variants);
    const [extralist, setExtraList] = useState(item?.extra);
    const [groupedVariants, setGroupedVariants] = useState({});
    const [qty, setQty] = useState(1);
    const [selectedExtras, setSelectedExtras] = useState([]);
    const [selectedVariants, setselectedVariant] = useState([]);
    const [instruction, setInstruction] = useState(null);
    const [itemprice, setItemprice] = useState(0);

    const handleCheckboxChange = (event, item) => {
        if (event.target.checked) {
            setSelectedExtras((prevExtras) => [...prevExtras, item]); // Add selected item
        } else {
            setSelectedExtras((prevExtras) => 
                prevExtras.filter(extra => JSON.stringify(extra) !== JSON.stringify(item)) // Compare by value
            );
        }
    };

    useEffect(() => {
        reloadcart();

    }, [selectedExtras, selectedVariants, qty]);

    useEffect(() => {
        console.log("current timestamp"+quantity);
        setQty(1);
        setSelectedExtras([]);
        setselectedVariant([]);

    }, [quantity]);


    useEffect(() => {

        if (item) {
            setExtraList(item?.extra);
            loadvariantlist(item?.variants);
            setItemprice(item?.price);

            setQty(1);
        }
    }, [item]);

    const loadvariantlist = (objlist) => {
        function removeDuplicates(array) {
            const seen = new Set();
            return array.filter((item) => {
                const key = `${item.name}-${item.attributes}`;
                if (seen.has(key)) {
                    return false;
                }
                seen.add(key);
                return true;
            });
        }

        const uniqueVariants = removeDuplicates(objlist);
        const grouped = {};

        uniqueVariants.forEach((variant) => {
            if (!grouped[variant.attributes]) {
                grouped[variant.attributes] = [];
            }
            grouped[variant.attributes].push(variant);
        });

        setGroupedVariants(grouped);
    };

    const chooseVariant = (attribute, variant) => {
        setselectedVariant((prev) => ({
            ...prev,
            [attribute]: variant, // Store the selected variant for the attribute
        }));
    };

    const updateQty = (type) => {

        if (type == 'Increment') {
            console.log(qty);
            let q = qty + 1;
            setQty(q);
            
        } else {
            if (qty > 1) {
                let q = qty - 1;
                
                setQty(q);
            }
        }

    }

    const saveItem = () => {
        const objectToArray = Object.entries(selectedVariants).map(([key, value]) => {
            return { key, ...value }; // Spread the properties of each object
          });
          

       const cartobject ={
         name:item?.name,
         quantity:qty,
         price:item.price,
         extras:selectedExtras,
         variants:objectToArray,
         instruction:instruction
       }

       let arr =[];
       console.log(cartobject);
       if(!cartitems){
        arr.push(cartobject);
        cart(arr);
       }else{
        arr = [...cartitems]; // Copy existing cart items

        // Check if the item already exists
        const exists = arr.some(item => JSON.stringify(item) === JSON.stringify(cartobject));
    
        if (exists) {
            Swal.fire({
                text: 'Item already added',
                icon: 'failure',
                timer: 2000, // The alert will automatically close after 3 seconds
                showConfirmButton: false, // Hide the confirm button
              });
        } else {
            arr.push(cartobject); // Add new item if it's not a duplicate
            cart(arr);
        }

       }
       console.log(cartitems);
       //window.dispatchEvent(new Event("cartlist"));
        openInvoiceAction(cartitems);

    }

    const reloadcart =() =>{
        console.log(selectedVariants);
        let finalprice =0;
       console.log(selectedExtras);
        if(selectedExtras?.length ==0 &&  selectedVariants?.length ==0){
        finalprice = parseFloat(item?.price) * qty;
       setItemprice(finalprice);
        }else{
           let price =0;
            if(selectedExtras.length >0){
                selectedExtras.forEach(element => {
                  price =parseFloat(price)+ parseFloat(element.price);  
            });
            }
            Object.entries(selectedVariants).forEach(([key, value]) => {
                console.log(key, value); // key will be "Size" or "Quantity", and value will be the respective object
               
                price =parseFloat(price)+ parseFloat(value.price);  
            
            });
             
            finalprice = (parseFloat(item?.price)+parseFloat(price)) * qty;
            setItemprice(finalprice);
           // console.log(price);
        

        }

        

       
       

        
    
    }

    return (
        <>
            <div class="popup-additems">
                <div class="items-header">
                    <div class="left">
                        <img src="/assets/images/chicken_dumplings-thumb.png" alt="" />
                        <div class="itemname">
                            <h6>{item?.name} <i class="bi bi-exclamation-circle-fill text-secondary fs-6"></i></h6>
                            <p>{item?.description}</p>
                            <p class="price">$ {item?.price}</p>
                        </div>
                    </div>
                    <span class="close" onClick={closeadditem}><i class="bi bi-x-circle text-danger"></i></span>
                </div>
                <div class="quantity">
                    <h6>Quantity: <i class="bi bi-plus-circle"
                        onClick={() => updateQty('Increment')}></i>
                        <span>{qty}</span> <i class="bi bi-dash-circle" onClick={() => updateQty('Decrement')}></i>
                    </h6>
                </div>

                <div class="p-3">
                    {Object.keys(groupedVariants).map((attribute) => (
                        <div key={attribute} class="d-flex justify-content-between gap-3">
                            <div class="dropdown">
                                <h6>{attribute}</h6>
                                <button class="btn btn-outline-primary dropdown-toggle" type="button"
                                    id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    {selectedVariants[attribute]
                                ? `${selectedVariants[attribute].name} +$${selectedVariants[attribute].price}`
                                : "Regular +Rs0.00"}
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    {groupedVariants[attribute].map((variant, index) => (
                                        <>
                                            <li key={variant.name}>
                                                <a class="dropdown-item" href="#"
                                                onClick={(e) => {
                                                    e.preventDefault(); // Prevent page reload
                                                    chooseVariant(attribute, variant);
                                                }}
                                                >{variant.name} +$ {variant.price}</a></li>
                                        </>))}
                                </ul>
                            </div>



                        </div>
                    ))}
                </div>
                <form>


                    <div class="form-group ">
                        <h6>Extras</h6>
                        <div class="d-flex gap-3">
                            {extralist?.map((item, index) => (
                                <div key={index} class="radio-group ">
                                    <input type="checkbox"
                                        onChange={(e) => handleCheckboxChange(e, item)}
                                        checked={selectedExtras.some(extra => JSON.stringify(extra) === JSON.stringify(item))} 
                                         name="extras" /> <span>{item.name} <br />
                                        + $ {item.price}</span>
                                </div>
                            ))}
                        </div>
                    </div>



                </form>


                {/*<div class="addon">
                    <h6>Addons</h6>
                    <div class="addons-details">
                        <img src="/assets/images/chicken_dumplings-thumb.png" alt="" />
                        <div class="addons-itemsdetails">
                            <div class="addons-itemname">
                                <p>Soda (can)</p>
                                <p class="price">₹2.50</p>
                            </div>
                            <div class="right">
                                <span><i class="bi bi-exclamation-circle-fill text-secondary fs-6"></i></span>
                                <p>
                                    <i class="bi bi-plus-circle"></i>
                                    <span>1</span>
                                    <i class="bi bi-dash-circle"></i>
                                </p>
                            </div>
                        </div>
                    </div>
    </div>*/}

                <div class="instruction">
                    <h6>Special Instructions</h6>
                    <textarea name="instruction" id="instruction"
                     value={instruction}
                     onChange={(e) => setInstruction(e.target.value)}
                        rows="10" placeholder="Add note (extra mayo, cheese, etc.)"></textarea>
                </div>

                <div class="add-cart">
                    <button type="submit" onClick={saveItem} class="btn btn-primary">
                        Add to Cart - <span>$ {itemprice}</span>
                    </button>
                </div>
            </div>
        </>
    )
}
export default AddItemComponent