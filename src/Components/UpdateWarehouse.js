import React, { useEffect, useState } from "react";
import PageLayout from "../HOC/PageLayout";
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import axios from "axios";
import { elements } from "../Cons";
import { useForm } from "react-hook-form";
import Loading from "./Loading";

const UpdateWarehouse = () => {
    const { wareHouseID } = useParams();
    const token = useSelector(state => state.login.token)
    const { register, handleSubmit, watch, errors ,setValue} = useForm();
    const [warehouse, setWarehouse] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (wareHouseID) {
            setLoading(true)
            axios.post(`${elements.API_ENDPOINT}/getWarehouseInfo`, { wareHouseID }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token
                }
            })
                .then(res => {
                    setWarehouse(res.data)
                    setValue('shippingStart', res.data.shippingStart)
                    setValue('shippingEnd', res.data.shippingEnd)
                    setValue('racking', res.data.racking)
                    setValue('maxRackWeight', res.data.maxRackWeight)
                    setValue('maxPalletHeight', res.data.maxPalletHeight)
                    setValue('warehouseType', res.data.warehouseType)
                    setValue('electricityLoad', res.data.electricityLoad)
                    setValue('Skylight', res.data.Skylight)
                    setValue('turbovents', res.data.turbovents)
                    setValue('parkingArea', res.data.parkingArea)
                    setValue('FSSAIApproved', res.data.FSSAIApproved)
                    setValue('drugLicensed', res.data.drugLicensed)
                    setValue('exciseApproved', res.data.exciseApproved)
                    setValue('security', res.data.security)
                    setValue('CCTVSurveillance', res.data.CCTVSurveillance)
                    setValue('fireExtinguishers', res.data.fireExtinguishers)
                    setValue('PowerBackupGenerator', res.data.PowerBackupGenerator)
                    setValue('handPalletTrolley', res.data.handPalletTrolley)
                    setValue('forkLift', res.data.forkLift)
                    setValue('woodenPallet', res.data.woodenPallet)
                    setValue('shrinkWrap', res.data.shrinkWrap)
                    setValue('internetleasedline', res.data.internetleasedline)
                    setValue('wmsSoftware', res.data.wmsSoftware)
                    setValue('manualMIS', res.data.manualMIS)
                    setValue('barcoding', res.data.barcoding)
                    setLoading(false)

                })
                .catch(err => {
                    console.log(err)
                    setLoading(false)
                })
        }

    }, [wareHouseID])
    
    const onSubmit = (data) => {
        setLoading(true)

        axios.post(`${elements.API_ENDPOINT}/addWarehouse`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            }
        })
            .then(res => {
               alert(res.data.message)
                setLoading(false)

            })
            .catch(err => {
                console.log(err)
                alert(err && err.response.data.message)
                setLoading(false)
            })
    }
    return <React.Fragment>
        <h1>Update Warehouse</h1>


        <form onSubmit={handleSubmit(onSubmit)}>
            <table className="table table-hover">
                <tbody>

                    {warehouse && <>
                        <tr>
                            <td>
                                Views
                        </td>
                            <td>
                                {warehouse ? warehouse.views : ""}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Contacted
                        </td>
                            <td>
                                {warehouse ? warehouse.contacted : ""}
                            </td>
                        </tr>
                    </>
                    }
                    {!warehouse && <>
                        <tr>
                            <td>
                                Client Email
                        </td>
                            <td>
                                <input type="text" className={errors.email ? "form-control is-invalid":"form-control"}
                                    name="email"
                                    ref={register({
                                        required: true
                                    })} />
                            </td>
                        </tr>
                    </>}
                    <tr>
                        <td>
                            featured
                        </td>
                        <td>
                            <select ref={register()}
                                name="featured"
                                className="form-control"
                                defaultValue={warehouse ? warehouse.featured : ""}>
                                <option value="false">No</option>
                                <option value="true">yes</option>

                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Status
                        </td>
                        <td>
                            <select ref={register()}
                                name="isActive"
                                className="form-control"
                                defaultValue={warehouse ? warehouse.isActive : ""}>
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Warehouse Name
                        </td>
                        <td>
                            <input type="text" className={errors.warehouseName ? "form-control is-invalid":"form-control"}
                                defaultValue={warehouse ? warehouse.warehouseName : ""}
                                name="warehouseName"
                                ref={register({
                                    required:true
                                })} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            WareHouse Desc
                        </td>
                        <td>
                            <textarea type="text" className={errors.wareHouseDesc ? "form-control is-invalid":"form-control"}
                                defaultValue={warehouse ? warehouse.wareHouseDesc : ""}
                                name="wareHouseDesc"
                                ref={register({
                                    required:true
                                })} >
                            </textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Addressline1
                        </td>
                        <td>
                            <input type="text" className="form-control"
                                defaultValue={warehouse ? warehouse.Addressline1 : ""}
                                name="Addressline1"
                                ref={register()} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Addressline2
                        </td>
                        <td>
                            <input type="text" className="form-control"
                                defaultValue={warehouse ? warehouse.Addressline2 : ""}
                                name="Addressline2"
                                ref={register()} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Addressline3
                        </td>
                        <td>
                            <input type="text" className="form-control"
                                defaultValue={warehouse ? warehouse.Addressline3 : ""}
                                name="Addressline3"
                                ref={register()} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            city
                        </td>
                        <td>
                            <input type="text" className="form-control"
                                defaultValue={warehouse ? warehouse.city : ""}
                                name="city"
                                ref={register()} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            state
                        </td>
                        <td>
                            <input type="text" className="form-control"
                                defaultValue={warehouse ? warehouse.state : ""}
                                name="state"
                                ref={register()} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            PIN
                        </td>
                        <td>
                            <input type="text" className="form-control"
                                defaultValue={warehouse ? warehouse.pin : ""}
                                name="pin"
                                ref={register()} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Warehouse Space
                        </td>
                        <td>
                            <input type="text" className="form-control"
                                defaultValue={warehouse ? warehouse.warehouseSpace : ""}
                                name="warehouseSpace"
                                ref={register()} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            shippingStart
                        </td>
                        <td>
                            <select className="form-control" ref={register()}
                                name="shippingStart"
                                defaultValue={warehouse ? warehouse.shippingStart : ""}>
                                <option value="">Select</option>
                                {elements.shippingSlots.map((s, i) => <option value={s} key={i}>{s}</option>)}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>shippingEnd

                        </td>
                        <td>
                            <select className="form-control" ref={register()}
                                name="shippingEnd"
                                defaultValue={warehouse ? warehouse.shippingEnd : ""}>
                                <option value="">Select</option>
                                {elements.shippingSlots.map((s, i) => <option value={s} key={i}>{s}</option>)}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            shippingNotes
                        </td>
                        <td>
                            <textarea type="text" className="form-control"
                                defaultValue={warehouse ? warehouse.shippingNotes : ""}
                                name="shippingNotes"
                                ref={register()} >
                            </textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            PerSquareFtRate
                        </td>
                        <td>
                            <input type="text" className="form-control"
                                defaultValue={warehouse ? warehouse.PerSquareFtRate : ""}
                                name="PerSquareFtRate"
                                ref={register()} />
                        </td>
                    </tr>
                    <tr>
                        <td>racking

                        </td>
                        <td>
                            <select className="form-control" ref={register()}
                                name="racking"
                                defaultValue={warehouse ? warehouse.racking : ""}>
                                <option value="">Select</option>
                                <option value="G + 1 High">G + 1 High</option>
                                <option value="G + 2 High">G + 2 High</option>
                                <option value="G + 3 High">G + 3 High</option>
                                <option value="G + 4 High">G + 4 High</option>
                                <option value="4 + High">4 + High</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            rackPosAvilable
                        </td>
                        <td>
                            <input type="text" className="form-control"
                                defaultValue={warehouse ? warehouse.rackPosAvilable : ""}
                                name="rackPosAvilable"
                                ref={register()} />
                        </td>
                    </tr>

                    <tr>
                        <td>maxPalletHeight

                        </td>
                        <td>
                            <select className="form-control" ref={register()}
                                name="maxPalletHeight"
                                defaultValue={warehouse ? warehouse.maxPalletHeight : ""}>
                                <option value="">Select</option>
                                <option value="Don't Know">Don't Know</option>
                                <option value="4 ft or less">4 ft or less</option>
                                <option value="5 ft">5 ft</option>
                                <option value="6 ft">6 ft</option>
                                <option value="7 ft">7 ft</option>
                                <option value="8 ft">8 ft</option>
                            </select>
                        </td>
                    </tr>


                    <tr>
                        <td>maxRackWeight

                        </td>
                        <td>
                            <select className="form-control" ref={register()}
                                name="maxRackWeight"
                                defaultValue={warehouse ? warehouse.maxRackWeight : ""}>
                                <option value="">Select</option>
                                <option value="Don't Know">Don't Know</option>
                                <option value="100 KGs or less per pallet">100 KGs or less per pallet</option>
                                <option value="300 KGs per pallet">300 KGs per pallet</option>
                                <option value="500 KGs per pallet">500 KGs per pallet</option>
                                <option value="1000 KGs per pallet">1000 KGs per pallet</option>
                                <option value="1000 KGs or above per pallet">1000 KGs or above per pallet</option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            rackCostPerPallet
                        </td>
                        <td>
                            <input type="text" className="form-control"
                                defaultValue={warehouse ? warehouse.rackCostPerPallet : ""}
                                name="rackCostPerPallet"
                                ref={register()} />
                        </td>
                    </tr>

                    <tr>
                        <td>
                            avilableFLoor
                        </td>
                        <td>
                            <input type="text" className="form-control"
                                defaultValue={warehouse ? warehouse.avilableFLoor : ""}
                                name="avilableFLoor"
                                ref={register()} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            floorPricePerPallet
                        </td>
                        <td>
                            <input type="text" className="form-control"
                                defaultValue={warehouse ? warehouse.floorPricePerPallet : ""}
                                name="floorPricePerPallet"
                                ref={register()} />
                        </td>
                    </tr>

                    <tr>
                        <td>
                            sfPricePerPallet
                        </td>
                        <td>
                            <input type="text" className="form-control"
                                defaultValue={warehouse ? warehouse.sfPricePerPallet : ""}
                                name="sfPricePerPallet"
                                ref={register()} />
                        </td>
                    </tr>


                    <tr>
                        <td>
                            airportDistance
                        </td>
                        <td>
                            <input type="text" className="form-control"
                                defaultValue={warehouse ? warehouse.airportDistance : ""}
                                name="airportDistance"
                                ref={register()} />
                        </td>
                    </tr>

                    <tr>
                        <td>
                            seaportDistance
                        </td>
                        <td>
                            <input type="text" className="form-control"
                                defaultValue={warehouse ? warehouse.seaportDistance : ""}
                                name="seaportDistance"
                                ref={register()} />
                        </td>
                    </tr>

                    <tr>
                        <td>
                            dryportDistance
                        </td>
                        <td>
                            <input type="text" className="form-control"
                                defaultValue={warehouse ? warehouse.dryportDistance : ""}
                                name="dryportDistance"
                                ref={register()} />
                        </td>
                    </tr>

                    <tr>
                        <td>warehouseType</td>
                        <td><select
                            className="form-control" ref={register()}
                            name="warehouseType"
                            defaultValue={warehouse ? warehouse.warehouseType : ""}

                        >
                            <option value="">Select</option>
                            <option value="bonded">Bonded</option>
                            <option value="nonBonded">Non Bonded</option>
                        </select>
                        </td>
                    </tr>

                    <tr>
                        <td>electricityLoad</td>
                        <td><select
                            className="form-control" ref={register()}
                            name="electricityLoad"
                            defaultValue={warehouse ? warehouse.electricityLoad : ""}

                        >
                            <option value="">Select</option>
                            <option value="comm-standard">Commercial Standard</option>
                            <option value="comm-heavy">Commercial Heavy Duty</option>
                        </select>
                        </td>
                    </tr>

                    <tr>
                        <td>numberOfDocs</td>
                        <td>
                            <input type="text" className="form-control"
                                defaultValue={warehouse ? warehouse.numberOfDocs : ""}
                                name="numberOfDocs"
                                ref={register()} />
                        </td>
                    </tr>

                    <tr>
                        <td>
                            Skylight
                        </td>
                        <td>
                            <select ref={register()}
                                name="Skylight"
                                className="form-control"
                                defaultValue={warehouse ? warehouse.Skylight : ""}>
                                <option value="">Select</option>
                                <option value="true">yes</option>
                                <option value="false">No</option>
                            </select>
                        </td>
                    </tr>


                    <tr>
                        <td>
                            turbovents
                        </td>
                        <td>
                            <select ref={register()}
                                name="turbovents"
                                className="form-control"
                                defaultValue={warehouse ? warehouse.turbovents : ""}>
                                <option value="">Select</option>
                                <option value="true">yes</option>
                                <option value="false">No</option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            parkingArea
                        </td>
                        <td>
                            <select ref={register()}
                                name="parkingArea"
                                className="form-control"
                                defaultValue={warehouse ? warehouse.parkingArea : ""}>
                                <option value="">Select</option>
                                <option value="true">yes</option>
                                <option value="false">No</option>
                            </select>
                        </td>
                    </tr>


                    <tr>
                        <td>
                            FSSAIApproved
                        </td>
                        <td>
                            <select ref={register()}
                                name="FSSAIApproved"
                                className="form-control"
                                defaultValue={warehouse ? warehouse.FSSAIApproved : ""}>
                                <option value="">Select</option>
                                <option value="true">yes</option>
                                <option value="false">No</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            drugLicensed
                        </td>
                        <td>
                            <select ref={register()}
                                name="drugLicensed"
                                className="form-control"
                                defaultValue={warehouse ? warehouse.drugLicensed : ""}>
                                <option value="">Select</option>
                                <option value="true">yes</option>
                                <option value="false">No</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            exciseApproved
                        </td>
                        <td>
                            <select ref={register()}
                                name="exciseApproved"
                                className="form-control"
                                defaultValue={warehouse ? warehouse.exciseApproved : ""}>
                                <option value="">Select</option>
                                <option value="true">yes</option>
                                <option value="false">No</option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            security
                        </td>
                        <td>
                            <select ref={register()}
                                name="security"
                                className="form-control"
                                defaultValue={warehouse ? warehouse.security : ""}>
                                <option value="">Select</option>
                                <option value="true">yes</option>
                                <option value="false">No</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            CCTVSurveillance
                        </td>
                        <td>
                            <select ref={register()}
                                name="CCTVSurveillance"
                                className="form-control"
                                defaultValue={warehouse ? warehouse.CCTVSurveillance : ""}>
                                <option value="">Select</option>
                                <option value="true">yes</option>
                                <option value="false">No</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            fireExtinguishers
                        </td>
                        <td>
                            <select ref={register()}
                                name="fireExtinguishers"
                                className="form-control"
                                defaultValue={warehouse ? warehouse.fireExtinguishers : ""}>
                                <option value="">Select</option>
                                <option value="true">yes</option>
                                <option value="false">No</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            PowerBackupGenerator
                        </td>
                        <td>
                            <select ref={register()}
                                name="PowerBackupGenerator"
                                className="form-control"
                                defaultValue={warehouse ? warehouse.PowerBackupGenerator : ""}>
                                <option value="">Select</option>
                                <option value="true">yes</option>
                                <option value="false">No</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            handPalletTrolley
                        </td>
                        <td>
                            <select ref={register()}
                                name="handPalletTrolley"
                                className="form-control"
                                defaultValue={warehouse ? warehouse.handPalletTrolley : ""}>
                                <option value="">Select</option>
                                <option value="true">yes</option>
                                <option value="false">No</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            forkLift
                        </td>
                        <td>
                            <select ref={register()}
                                name="forkLift"
                                className="form-control"
                                defaultValue={warehouse ? warehouse.forkLift : ""}>
                                <option value="">Select</option>
                                <option value="true">yes</option>
                                <option value="false">No</option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            woodenPallet
                        </td>
                        <td>
                            <select ref={register()}
                                name="woodenPallet"
                                className="form-control"
                                defaultValue={warehouse ? warehouse.woodenPallet : ""}>
                                <option value="">Select</option>
                                <option value="true">yes</option>
                                <option value="false">No</option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            shrinkWrap
                        </td>
                        <td>
                            <select ref={register()}
                                name="shrinkWrap"
                                className="form-control"
                                defaultValue={warehouse ? warehouse.shrinkWrap : ""}>
                                <option value="">Select</option>
                                <option value="true">yes</option>
                                <option value="false">No</option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            internetleasedline
                        </td>
                        <td>
                            <select ref={register()}
                                name="internetleasedline"
                                className="form-control"
                                defaultValue={warehouse ? warehouse.internetleasedline : ""}>
                                <option value="">Select</option>
                                <option value="true">yes</option>
                                <option value="false">No</option>
                            </select>
                        </td>
                    </tr>


                    <tr>
                        <td>
                            wmsSoftware
                        </td>
                        <td>
                            <select ref={register()}
                                name="wmsSoftware"
                                className="form-control"
                                defaultValue={warehouse ? warehouse.wmsSoftware : ""}>
                                <option value="">Select</option>
                                <option value="true">yes</option>
                                <option value="false">No</option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            manualMIS
                        </td>
                        <td>
                            <select ref={register()}
                                name="manualMIS"
                                className="form-control"
                                defaultValue={warehouse ? warehouse.manualMIS : ""}>
                                <option value="">Select</option>
                                <option value="true">yes</option>
                                <option value="false">No</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            barcoding
                        </td>
                        <td>
                            <select ref={register()}
                                name="barcoding"
                                className="form-control"
                                defaultValue={warehouse ? warehouse.barcoding : ""}>
                                <option value="">Select</option>
                                <option value="true">yes</option>
                                <option value="false">No</option>
                            </select>
                        </td>
                    </tr>


                    <tr>
                        <td>internalName</td>
                        <td>
                            <input type="text" className="form-control"
                                defaultValue={warehouse ? warehouse.internalName : ""}
                                name="internalName"
                                ref={register()} />
                        </td>
                    </tr>


                    <tr>
                        <td>longitude</td>
                        <td>
                            <input type="text" className="form-control"
                                defaultValue={warehouse ? warehouse.location.coordinates[0] : ""}
                                name="longitude"
                                ref={register()} />
                        </td>
                    </tr>
                    <tr>
                        <td>latitude</td>
                        <td>
                            <input type="text" className="form-control"
                                defaultValue={warehouse ? warehouse.location.coordinates[1] : ""}
                                name="latitude"
                                ref={register()} />
                        </td>
                    </tr>


                </tbody>

            </table>
            {warehouse &&
                <input type="hidden" className="form-control"
                    defaultValue={warehouse._id}
                    name="_id"
                    ref={register()} />
            }
            <button type="submit" className="btn btn-primary btn-lg">Update</button>

        </form>



        {loading && <Loading />}
    </React.Fragment>
}

export default PageLayout(UpdateWarehouse);