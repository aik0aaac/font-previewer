export interface LocalFont {
  /**
   * フォントのファミリーネーム。
   * 例: `October Tamil`
   */
  family: string
  /**
   * フォントのフルネーム。
   * 例: `October Tamil Black`
   */
  fullName: string
  /**
   * フォントのpostscriptとしての名称。
   * 例: `OctoberTL-Black`
   */
  postscriptName: string
  style: string
}
