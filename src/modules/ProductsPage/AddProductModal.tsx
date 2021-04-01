/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import {Modal, ModalBody, ModalHeader} from 'reactstrap';
import {RouteComponentProps} from "reach__router";

const AddProductModal: React.FC<RouteComponentProps & {
    className: string,
    modal: boolean,
    setModal: (arg: boolean) => void,
}> = ({
          className,
          modal,
          setModal,
          children
      }) => {

    const toggle = () => setModal(!modal);

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Product details</ModalHeader>
                <ModalBody>
                    {children}
                </ModalBody>
            </Modal>
        </div>
    );
};

export default AddProductModal;
