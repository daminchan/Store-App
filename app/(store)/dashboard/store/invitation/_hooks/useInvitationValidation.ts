import { useState, useCallback } from "react";
import { invitationFormSchema } from "../_components/InvitationForm/_schemas/validation";

/**
 * 招待コードのバリデーションフック
 * @description 招待コードの入力値管理とバリデーションを行う
 */
export const useInvitationValidation = () => {
  const [code, setCode] = useState("");

  /**
   * フォームのバリデーション
   * @returns バリデーション結果
   */
  const validateForm = useCallback(() => {
    const result = invitationFormSchema.safeParse({ code });
    return result.success;
  }, [code]);

  return {
    code,
    setCode,
    validateForm,
  };
};
