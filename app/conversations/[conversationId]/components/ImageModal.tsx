"use client";

import Modal from "@/app/components/Modal";
import Image from "next/image";

interface ImageModalProps {
  isOpen?: boolean;
  onClose: () => void;
  src?: string | null;
}

const ImageModal: React.FC<ImageModalProps> = ({ onClose, src, isOpen }) => {
  if (!src) return null;

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <div className="w-80 h-80">
        <Image alt="full image" className="object-cover" fill src={src} />
      </div>
    </Modal>
  );
};

export default ImageModal;
