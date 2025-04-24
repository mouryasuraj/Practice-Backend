import { handleError } from "../utils/helper.js"
import { validateSendRequestBody } from "../utils/validation.js"

export const handleSendRequest = async (req, res) =>{
    try {

        // validate request body
        validateSendRequestBody(req)
        
        res.send("Hello from request")
    } catch (error) {
        handleError(error, res)
    }
}