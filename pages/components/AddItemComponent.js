import { useEffect, useState } from "react";


const AddItemComponent =({closeActionItem,item})=>{

    const closeadditem =async() =>{
        closeActionItem('additems');
    }
    const [variantlist,setVarianList] =useState(item?.variants);
    const [extralist,setExtraList] =useState(item?.extra);
    const [groupedVariants, setGroupedVariants] = useState({});

    useEffect(() => {
        if(item){
        loadvariantlist(item?.variants);
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

      const selectVariant =(variant)=>{

      }

    return(
     <>
    <div class="popup-additems">
                <div class="items-header">
                    <div class="left">
                        <img src="/assets/images/chicken_dumplings-thumb.png" alt="" />
                        <div class="itemname">
                            <h6>Chicken Dumplings <i class="bi bi-exclamation-circle-fill text-secondary fs-6"></i></h6>
                            <p>With a side of fried rice or supreme soy noodles, and steamed chinese greens with oyster
                                sauce</p>
                            <p class="price">₹2.50</p>
                        </div>
                    </div>
                    <span class="close" onClick={closeadditem}><i class="bi bi-x-circle text-danger"></i></span>
                </div>
                <div class="quantity">
                    <h6>Quantity: <i class="bi bi-plus-circle"></i> 
                    <span>1</span> <i class="bi bi-dash-circle"></i>
                    </h6>
                </div>

                <div class="p-3">
                {Object.keys(groupedVariants).map((attribute) => (
                    <div key={attribute} class="d-flex justify-content-between gap-3">
                        <div class="dropdown">
                    <h6>{attribute}</h6>
                    <button class="btn btn-outline-primary dropdown-toggle" type="button"
                                id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                Regular +Rs0.00
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            {groupedVariants[attribute].map((variant, index) => (
                                <>
                                <li><a class="dropdown-item" href="#" 
                                onClick={()=>selectVariant(variant)}>{variant.name} +$ {variant.price}</a></li>
                               </> ))}
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
                            <div  key={index} class="radio-group ">
                                <input type="radio" name="status" /> <span>{item.name} <br/>
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
                    <textarea name="" id="" rows="10" placeholder="Add note (extra mayo, cheese, etc.)"></textarea>
                </div>

                <div class="add-cart">
                    <button type="submit" class="btn btn-primary">
                        Add to Cart - <span>$2.50</span>
                    </button>
                </div>
            </div>
     </>
    )
}
export default AddItemComponent