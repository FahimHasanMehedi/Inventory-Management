import React, { useContext } from "react";

import PromptModal from "../UI/PromptModal/PromptModal";
import WarningIcon from "@mui/icons-material/Warning";

import "./GroupDeletePrompt.css";

import { useDispatch, useSelector } from "react-redux";
import { deleteCategoryAsync } from "../../features/categories/categoriesSlice";
import { handlePrompt } from "../../features/modal/modalSlice";

const GroupDeletePrompt = () => {
    const { selectedCategory } = useSelector((state) => state.categories);
    const dispatch = useDispatch();

    const deleteCategoryHandler = () => {
        console.log(selectedCategory);
        dispatch(deleteCategoryAsync(selectedCategory));
        dispatch(handlePrompt());
    };
    return (
        <PromptModal>
            <WarningIcon style={{ color: "#ffd43b", fontSize: "112px" }} />
            <div className="prompts">
                <div className="prompt-texts">
                    <h3>Delete product group</h3>
                    <p>Are you sure you want to delete group?</p>
                </div>

                <div className="prompt-buttons">
                    <button onClick={deleteCategoryHandler}>Yes</button>
                    <button onClick={(e) => dispatch(handlePrompt())}>No</button>
                </div>
            </div>
        </PromptModal>
    );
};

export default GroupDeletePrompt;
