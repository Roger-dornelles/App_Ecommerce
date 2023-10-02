import React, {useEffect, useState} from 'react';
import themes from '../../../themes/themes';
import Text from '../../Text';
import {
  Number,
  AreaCard,
  AreaNumberAndComplement,
  Button,
  Complement,
  Container,
  Error,
  Success,
} from './styles';
import Input from '../../Input';
import SelectParcel from './SelectParcel';

import apiNumberOfParcel from '../../../api/NumberOfParcel';
import apiConfirmPurchase from '../../../api/purchase';

import {useDispatch, useSelector} from 'react-redux';

import {setModalAction} from '../../../store/reducers/modalReducer';

import {ValidatePhone} from '../../../utils/validatePhone';
import {ValidateName} from '../../../utils/validateName';
import {MaskDate} from '../../../utils/maskDate';
import {CardMask} from '../../../utils/maskCard';
import {useCurrencyFormetted} from '../../../hooks/useCurrencyFormatted';
import {ActivityIndicator} from 'react-native';
import {RootState} from '../../../store';
import {PurchaseTypes} from '../../../types/Purchase';
import {setRemoverItemCartAction} from '../../../store/reducers/cartReducer';

type CardProps = {
  cardName: string;
  handleCloseModal: (value: boolean) => void;
  handleConfirmPaymentSuccess: (value: boolean) => void;
};

const cardNames = ['master card', 'elo', 'visa'];

const Index = ({
  cardName,
  handleCloseModal,
  handleConfirmPaymentSuccess,
}: CardProps) => {
  const dispatch = useDispatch();
  const {address, contact, district, name, newState, number} = useSelector(
    (state: RootState) => state.newAddress,
  );
  const {cart} = useSelector((state: RootState) => state.cartReducer);
  const {user} = useSelector((state: RootState) => state.useReducer);

  const [numberOfParcelSelected, setNumberOfParcelSelected] =
    useState<string>();
  const [numberOfParcel, setNumberOfParcel] = useState();
  const [numberCad, setNumberCard] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [nameUserCard, setNameUserCard] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [addressUser, setAddressUser] = useState<string>();
  const [complement, setComplement] = useState<string>();
  const [securityCode, setSecurityCode] = useState<string>();
  const [numberAddress, setNumberAddress] = useState<string>();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{message: string | null; error: boolean}>({
    message: '',
    error: false,
  });
  const [success, setSuccess] = useState<{message: string; open: boolean}>({
    message: '',
    open: false,
  });

  const valueTotalPurchase = useCurrencyFormetted();

  const validateSecurityCodeLength = () => {
    const securityCodeValidate = cardNames.includes(cardName.toLowerCase());
    if (securityCodeValidate) {
      return 3;
    }
    return 4;
  };

  useEffect(() => {
    const getParcels = async () => {
      const result = await apiNumberOfParcel.numberParcels(
        valueTotalPurchase as unknown as string,
      );

      if (result?.error) {
        dispatch(
          setModalAction({
            message: result.message,
            open: true,
            type: 'error',
          }),
        );
      }

      if (!result?.error) {
        setNumberOfParcel(result?.data);
      }
    };

    getParcels();
  }, [dispatch, valueTotalPurchase]);

  const handleNumberOfParcelSelected = (value: string) => {
    setNumberOfParcelSelected(value);
  };

  const handleButtonCancelPayment = () => {
    handleCloseModal(false);
  };

  const handleConfirmPurchase = async () => {
    try {
      let purchase: PurchaseTypes[] = [];
      setLoading(true);
      if (
        nameUserCard &&
        numberOfParcelSelected &&
        numberCad &&
        date &&
        addressUser &&
        securityCode &&
        phone &&
        complement &&
        numberAddress
      ) {
        purchase.push({
          id: user.id as number,
          userID: user.id as number,
          name: nameUserCard,
          numberOfParcelSelected,
          cardName,
          numberCad,
          phone,
          address: addressUser,
          complement,
          securityCode,
          date,
          numberAddress,
          totalPurchase: valueTotalPurchase as string,
          deliveryAddress: {
            address,
            contact,
            district,
            name,
            newState,
            number,
          },
          userProductDataOfPurchase: cart,
        });

        const result = await apiConfirmPurchase.userPurchase({
          id: user.id as number,
          userID: user.id as number,
          name: nameUserCard,
          numberOfParcelSelected,
          cardName,
          numberCad,
          phone,
          address: addressUser,
          complement,
          securityCode,
          date,
          totalPurchase: valueTotalPurchase as string,
          deliveryAddress: {
            address,
            contact,
            district,
            name,
            newState,
            number,
          },
          userProductDataOfPurchase: cart,
          numberAddress,
        });

        if (result?.error) {
          setError({
            error: true,
            message: result.message,
          });
          setLoading(false);
          setTimeout(() => {
            setError({
              message: '',
              error: false,
            });
          }, 2500);
        }

        if (!result?.error) {
          setSuccess({
            message: 'Pagamento Efetuado',
            open: true,
          });

          cart.map(i => {
            return dispatch(setRemoverItemCartAction({id: i.id}));
          });

          setTimeout(() => {
            setSuccess({
              message: '',
              open: false,
            });
            handleCloseModal(false);
            handleConfirmPaymentSuccess(true);
          }, 2500);
        }
      } else {
        setLoading(false);
        setError({
          message: 'Preencha todos os campos',
          error: true,
        });
        setTimeout(() => {
          setError({
            message: '',
            error: false,
          });
        }, 2750);
      }
    } catch (err) {
      setError({
        error: true,
        message: 'Ocorreu um erro, tente mais tarde',
      });

      setTimeout(() => {
        setError({error: false, message: ''});
      }, 2500);
    }
  };

  return (
    <Container>
      <Text
        text={`Cartão ${cardName}`}
        fontSize={16}
        textAlign="center"
        color={themes.theme.blue_100}
        marginTop={20}
      />

      <AreaCard>
        {error.error && (
          <Error>
            <Text
              text={`${error.message}`}
              color={themes.theme.white}
              textAlign="center"
            />
          </Error>
        )}

        {success.open && (
          <Success>
            <Text
              text={`${success.message}`}
              color={themes.theme.white}
              textAlign="center"
            />
          </Success>
        )}
        <SelectParcel
          data={numberOfParcel}
          text={'Selecionar parcela'}
          handleNumberOfParcelSelected={handleNumberOfParcelSelected}
        />
        <Input
          text="Numero do Cartão"
          inputMode="numeric"
          value={numberCad}
          onChangeText={text => setNumberCard(CardMask(text))}
          margintop={'5px'}
          maxLength={20}
        />

        <Input
          text="Codigo de segurança"
          inputMode="numeric"
          value={securityCode}
          onChangeText={text => setSecurityCode(text)}
          margintop={'5px'}
          maxLength={validateSecurityCodeLength()}
        />

        <Input
          text="Data validade"
          inputMode="numeric"
          value={date}
          onChangeText={text => setDate(MaskDate(text))}
          margintop={'5px'}
          maxLength={5}
        />

        <Input
          text="Nome completo"
          value={nameUserCard}
          onChangeText={text => setNameUserCard(text)}
          margintop={'5px'}
          isError={name && !ValidateName(name) ? true : false}
          messageError="Nome invalido"
        />

        <Input
          text="Celular"
          inputMode="numeric"
          value={phone}
          onChangeText={text => setPhone(ValidatePhone(text))}
          margintop={'5px'}
          maxLength={15}
        />

        <Input
          text="Endereço"
          value={addressUser}
          onChangeText={text => setAddressUser(text)}
          margintop={'5px'}
        />
        <AreaNumberAndComplement>
          <Number>
            <Input
              inputMode="numeric"
              text="Numero"
              value={numberAddress}
              onChangeText={text => setNumberAddress(text)}
              margintop={'5px'}
              maxLength={5}
            />
          </Number>
          <Complement>
            <Input
              text="Complemento"
              value={complement}
              onChangeText={text => setComplement(text)}
              margintop={'5px'}
            />
          </Complement>
        </AreaNumberAndComplement>

        <Button BgColor={themes.theme.green} onPress={handleConfirmPurchase}>
          {loading ? (
            <ActivityIndicator color={themes.theme.white} />
          ) : (
            <Text
              text="CONFIRMAR PAGAMENTO"
              textAlign="center"
              color={themes.theme.white}
            />
          )}
        </Button>

        <Button
          disabled={loading}
          isDisabled={loading}
          BgColor={themes.theme.red_200}
          onPress={handleButtonCancelPayment}>
          <Text text="CANCELAR" textAlign="center" color={themes.theme.white} />
        </Button>
      </AreaCard>
    </Container>
  );
};

export default Index;
