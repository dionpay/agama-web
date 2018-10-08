import React from 'react';
import translate from '../../translate/translate';
import QRModal from '../dashboard/qrModal/qrModal';
import Select from 'react-select';
import ReactTooltip from 'react-tooltip';
import WalletRisksModal from '../dashboard/walletRisksModal/walletRisksModal';
import Config from '../../config';
import assetsPath from '../../util/assetsPath';

const _shortcutOptions = [
  'kmd',
  'chips',
  'btch',
  'mnz',
  'revs',
  'jumblr',
  'kmd+revs+jumblr', // custom option
];
let shortcutOptions = [];

for (let i = 0; i < _shortcutOptions.length; i++) {
  shortcutOptions.push({
    value: _shortcutOptions[i],
    label: _shortcutOptions[i],
  });
}

const LoginRender = function() {
  return (
    <div>
      { this.renderSwallModal() }
      <WalletRisksModal />
      <div className="page vertical-align text-center">
        <div className="page-content vertical-align-middle col-xs-12 col-sm-6 col-sm-offset-3">
          <div className="brand">
            { !Config.whitelabel &&
              <img
                className="brand-img"
                src={ `${assetsPath.root}/agama-login-logo.svg` }
                width="200"
                height="160"
                alt="SuperNET Agama" />
            }
            { Config.whitelabel &&
              <img
                className="brand-img"
                src={ Config.wlConfig.mainLogo.indexOf('http') > -1 ? Config.wlConfig.mainLogo : `${assetsPath.root}/${Config.wlConfig.mainLogo}` }
                alt={ Config.wlConfig.title } />
            }
          </div>
          { !this.state.risksWarningRead &&
            <div className="margin-top-30 margin-bottom-40">
              <span
                onClick={ this.toggleRisksWarningModal }
                className="pointer fs-16">
                <i className="icon fa-warning margin-right-5"></i> { translate('INDEX.UNDERSTAND_RISKS_LINK') }
              </span>
            </div>
          }
          { this.renderResetSPVCoinsOption() &&
            <div className="margin-top-30 margin-bottom-40">
              <span
                onClick={ this.resetSPVCoins }
                className="pointer fs-16">
                <i className="icon fa-trash margin-right-5"></i> { translate('LOGIN.QMENU_REMOVE_SPV') }
              </span>
            </div>
          }
          { this.state.activeLoginSection === 'login' &&
            <div>
              <h4 className="color-white">
                { translate('INDEX.WELCOME_LOGIN') }
              </h4>
              { this.props.Login.pinList.length > 0 &&
               <span>{ translate('LOGIN.PIN_LOGIN_INFO') }</span>
              }
              <div className="form-group form-material floating col-sm-12 horizontal-padding-0">
                <form autoComplete="off">
                  <input
                    type="password"
                    name="loginPassphrase"
                    ref="loginPassphrase"
                    className={ !this.state.seedInputVisibility ? 'form-control' : 'hide' }
                    onChange={ this.updateLoginPassPhraseInput }
                    onKeyDown={ (event) => this.handleKeydown(event) }
                    autoComplete="off"
                    value={ this.state.loginPassphrase || '' } />
                  <textarea
                    className={ this.state.seedInputVisibility ? 'form-control' : 'hide' }
                    id="loginPassphrase"
                    ref="loginPassphraseTextarea"
                    name="loginPassphraseTextarea"
                    autoComplete="off"
                    onChange={ this.updateLoginPassPhraseInput }
                    onKeyDown={ (event) => this.handleKeydown(event) }
                    value={ this.state.loginPassphrase || '' }></textarea>
                  <i
                    className={ 'seed-toggle fa fa-eye' +  (!this.state.seedInputVisibility ? '-slash' : '') }
                    onClick={ this.toggleSeedInputVisibility }></i>
                  <label
                    className="floating-label"
                    htmlFor="inputPassword">{ translate('INDEX.WALLET_SEED') }</label>
                  <div className="qr-modal-login-block">
                    <QRModal
                      mode="scan"
                      setRecieverFromScan={ this.setRecieverFromScan } />
                  </div>
                </form>
              </div>
              { this.state.loginPassPhraseSeedType &&
                <div
                  className="form-group form-material floating horizontal-padding-0 margin-top-20 seed-type-block"
                  style={{ width: `${this.state.loginPassPhraseSeedType.length * 8}px` }}>
                  <div className="placeholder-label">{ this.state.loginPassPhraseSeedType }</div>
                </div>
              }
              { this.state.seedExtraSpaces &&
                <span>
                  <i className="icon fa-warning seed-extra-spaces-warning"
                    data-tip={ translate('LOGIN.SEED_TRAILING_CHARS') }
                    data-html={ true }></i>
                  <ReactTooltip
                    effect="solid"
                    className="text-left" />
                </span>
              }
              { this.state.loginPassphrase &&
                this.state.enableEncryptSeed &&
                <div className="row">
                  <div className="toggle-box padding-top-30 col-sm-3">
                    <span className="pointer">
                      <label className="switch">
                        <input
                          type="checkbox"
                          readOnly
                          checked={ this.shouldEncryptSeed() } />
                        <div
                          className="slider"
                          onClick={ () => this.toggleShouldEncryptSeed() }></div>
                      </label>
                      <div
                        className="toggle-label white"
                        onClick={ () => this.toggleShouldEncryptSeed() }>
                        { translate('LOGIN.ENCRYPT_SEED') }
                      </div>
                    </span>
                  </div>

                  <div className="col-sm-9">
                    <div className="form-group form-material floating horizontal-padding-0 margin-5 margin-right-0">
                      <input
                        type="text"
                        className="form-control"
                        name="encryptKey"
                        placeholder={ translate('LOGIN.ENCRYPT_KEY') }
                        onChange={ this.updateEncryptKey }
                        value={ this.state.encryptKey }
                        disabled={ !this.shouldEncryptSeed() } />
                    </div>

                    <div className="form-group form-material floating horizontal-padding-0 margin-5 margin-right">
                      <input
                        type="text"
                        className="form-control"
                        name="pubKey"
                        placeholder={ translate('LOGIN.PUBKEY') }
                        onChange={ this.updatePubKey }
                        value={ this.state.pubKey }
                        disabled={ !this.shouldEncryptSeed() } />
                    </div>
                  </div>
                </div>
              }

              { this.props.Login.pinList.length > 0 &&
                <div className="row margin-top-30">
                  <div className="col-xs-12">
                    <div className="pin-block-one">
                      <hr/>
                    </div>
                    <div className="pin-block-two">
                      <span>{ translate('INDEX.OR') }</span>
                    </div>
                    <div className="pin-block-three">
                      <hr/>
                    </div>
                  </div>
                </div>
              }
              { this.props.Login.pinList.length > 0 &&
                <div className="row">
                  <div className="form-group form-material floating col-sm-8 padding-left-10 horizontal-padding-0">
                    <select
                      className="form-control form-material"
                      name="storedPins"
                      value={ this.state.selectedPin }
                      onChange={ (event) => this.updateSelectedPin(event) }
                      autoFocus>
                      <option
                        className="login-option"
                        value="">{ translate('INDEX.SELECT') }</option>
                      { this.props.Login.pinList.map((pin) => {
                        return <option
                                className="login-option"
                                value={ pin }
                                key={ pin }>{ pin }</option>
                        })
                      }
                    </select>
                  </div>
                  <div className="form-group form-material floating col-sm-4 padding-left-10 margin-top-20">
                    <input
                      type="text"
                      className="form-control"
                      name="decryptKey"
                      placeholder={ translate('LOGIN.DECRYPT_KEY') }
                      disabled={ false }
                      onChange={ this.updateDecryptKey }
                      value={ this.state.decryptKey } />
                  </div>
                </div>
              }

              <button
                type="button"
                disabled={
                  !this.state.loginPassphrase ||
                  !this.state.loginPassphrase.length
                }
                className="btn btn-primary btn-block margin-top-20"
                onClick={ this.loginSeed }>
                { translate('INDEX.SIGN_IN') }
              </button>
              <div className="form-group form-material floating">
                <button
                  className="btn btn-lg btn-flat btn-block waves-effect"
                  id="register-btn"
                  onClick={ () => this.updateActiveLoginSection('signup') }>
                  { translate('INDEX.CREATE_WALLET') }
                </button>
                <button
                  className="btn btn-lg btn-flat btn-block waves-effect hide"
                  id="logint-another-wallet">
                  { translate('INDEX.LOGIN_ANOTHER_WALLET') }
                </button>
                { (!Config.whitelabel || (Config.whitelabel && Config.wlConfig.enableAllCoins)) &&
                  <button
                    className="btn btn-lg btn-flat btn-block waves-effect margin-top-20"
                    id="register-btn"
                    onClick={ this.toggleActivateCoinForm }
                    disabled={ !this.props.Main }>
                    <span className="ladda-label">
                      { translate('ADD_COIN.ADD_ANOTHER_COIN') }
                    </span>
                  </button>
                }
              </div>
            </div>
          }

          { this.state.activeLoginSection === 'activateCoin' &&
            <div>
              <h4 className="color-white">
                { translate('INDEX.WELCOME_PLEASE_ADD') }
              </h4>
              { (!Config.whitelabel || (Config.whitelabel && Config.wlConfig.enableAllCoins)) &&
                <div className="form-group form-material floating width-540 vertical-margin-30 auto-side-margin">
                  <button
                    className="btn btn-lg btn-primary btn-block ladda-button"
                    onClick={ this.toggleActivateCoinForm }
                    disabled={ !this.props.Main }>
                    <span className="ladda-label">
                      { translate('INDEX.ACTIVATE_COIN') }
                    </span>
                  </button>
                  <div className="line">{ translate('LOGIN.OR_USE_A_SHORTCUT') }</div>
                  <div className="addcoin-shortcut">
                    <div>
                      <i className="icon fa-flash margin-right-5"></i>
                      { translate('INDEX.SPV_MODE') }
                      <i
                        className="icon fa-question-circle login-help"
                        data-tip={
                          `${ translate('LOGIN.SPV_MODE_DESC_P1') }
                          <u>${ translate('LOGIN.SPV_MODE_DESC_P2') }</u>
                          ${ translate('LOGIN.SPV_MODE_DESC_P3') }
                          <div className="padding-top-10">${ translate('LOGIN.SPV_MODE_DESC_P4') }</div>`
                        }
                        data-html={ true }></i>
                      <ReactTooltip
                        effect="solid"
                        className="text-left" />
                    </div>
                    <Select
                      name="selectedShortcutSPV"
                      value={ this.state.selectedShortcutSPV }
                      onChange={ (event) => this.updateSelectedShortcut(event, 'spv') }
                      optionRenderer={ this.renderShortcutOption }
                      valueRenderer={ this.renderShortcutOption }
                      options={ shortcutOptions } />
                  </div>
                </div>
              }
            </div>
          }

          { this.state.activeLoginSection === 'signup' &&
            <div>
              <div className="register-form">

                <div className="form-group form-material floating seed-tooltip">
                  <textarea
                    className="form-control placeholder-no-fix height-100 selectable"
                    type="text"
                    id="walletseed"
                    value={ this.state.randomSeed }
                    onChange={ (e) => this.updateWalletSeed(e) }
                    readOnly={ !this.isCustomWalletSeed() }></textarea>
                  <button
                    className="copy-floating-label"
                    htmlFor="walletseed"
                    onClick={ () => this.copyPassPhraseToClipboard() }>
                    { translate('INDEX.COPY') }
                  </button>
                  { this.state.isCustomSeedWeak &&
                    <span className="tooltiptext">
                      <strong className="display--block padding-bottom-10">{ translate('INDEX.WEAK_SEED') }</strong>
                      <span className="display--block">{ translate('INDEX.YOUR_SEED_MUST_CONTAIN') }</span>
                      <span className="display--block">{ translate('INDEX.YOUR_SEED_MUST_CONTAIN1') }</span>
                      <span className="display--block">{ translate('INDEX.YOUR_SEED_MUST_CONTAIN2') }</span>
                      <span className="display--block">{ translate('INDEX.YOUR_SEED_MUST_CONTAIN3') }</span>
                      <span className="display--block">{ translate('INDEX.YOUR_SEED_MUST_CONTAIN4') }</span>
                      <span className="display--block">{ translate('INDEX.YOUR_SEED_MUST_CONTAIN5') }</span>
                    </span>
                  }
                  <label
                    className="floating-label"
                    htmlFor="walletseed">{ translate('INDEX.WALLET_SEED') }</label>
                </div>
                <div className="form-group form-material floating">
                  <textarea
                    className="form-control placeholder-no-fix height-100"
                    type="text"
                    name="randomSeedConfirm"
                    value={ this.state.randomSeedConfirm }
                    onChange={ this.updateRegisterConfirmPassPhraseInput }
                    id="rwalletseed"></textarea>
                  { this.state.isSeedBlank &&
                    <span className="help-block">
                      { translate('LOGIN.MUST_ENTER_SEED') }.
                    </span>
                  }
                  { this.state.isSeedConfirmError &&
                    <span className="help-block">
                      { translate('LOGIN.ENTER_VALUE_AGAIN') }.
                    </span>
                  }
                  <label
                    className="floating-label"
                    htmlFor="rwalletseed">{ translate('INDEX.CONFIRM_SEED') }</label>
                  { /* ff click issue fix, span tag inside button tag doesn't receive a click event */ }
                  <div className="btn btn-success btn-block margin-top-20 btn-generate-qr">
                    <QRModal
                      qrSize="256"
                      modalSize="md"
                      title={ translate('LOGIN.SEED_QR_RECOVERY') }
                      fileName="agama-seed"
                      content={ this.state.randomSeed } />
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={ this.handleRegisterWallet }>
                  { translate('INDEX.REGISTER') }
                </button>
                <div className="form-group form-material floating">
                  <button
                    className="btn btn-lg btn-flat btn-block waves-effect"
                    id="register-back-btn"
                    onClick={ () => this.updateActiveLoginSection('login') }>
                    { translate('INDEX.BACK_TO_LOGIN') }
                  </button>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default LoginRender;